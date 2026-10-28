-- Run against the project database as postgres. All fixtures are rolled back.
begin;
select set_config('mpowered.test_owner', gen_random_uuid()::text, true);
select set_config('mpowered.test_other', gen_random_uuid()::text, true);
select set_config('mpowered.test_person', gen_random_uuid()::text, true);

insert into auth.users (id) values
  (current_setting('mpowered.test_owner')::uuid),
  (current_setting('mpowered.test_other')::uuid);

set local role authenticated;
select set_config('request.jwt.claim.sub', current_setting('mpowered.test_owner'), true);
insert into public.support_people (id, user_id, name, phone, email, can_add_questions, can_view_answers)
values (current_setting('mpowered.test_person')::uuid, auth.uid(), 'Support QA', '+61400000000', 'qa@example.invalid', true, false);

do $$
begin
  assert (select count(*) = 1 from public.support_people where id = current_setting('mpowered.test_person')::uuid), 'Owner must read the saved person';
end $$;

update public.support_people set name = 'Support QA edited', can_view_answers = true
where id = current_setting('mpowered.test_person')::uuid;
do $$
begin
  assert (select name = 'Support QA edited' and can_add_questions and can_view_answers from public.support_people where id = current_setting('mpowered.test_person')::uuid), 'Owner edits must persist';
  begin
    update public.support_people set user_id = current_setting('mpowered.test_other')::uuid
    where id = current_setting('mpowered.test_person')::uuid;
    raise exception 'Ownership reassignment must be rejected';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub', current_setting('mpowered.test_other'), true);
do $$
declare affected integer;
begin
  assert (select count(*) = 0 from public.support_people where id = current_setting('mpowered.test_person')::uuid), 'Another account must not read the person';
  update public.support_people set name = 'Unauthorized' where id = current_setting('mpowered.test_person')::uuid;
  get diagnostics affected = row_count;
  assert affected = 0, 'Another account must not update the person';
  delete from public.support_people where id = current_setting('mpowered.test_person')::uuid;
  get diagnostics affected = row_count;
  assert affected = 0, 'Another account must not remove the person';
  begin
    insert into public.support_people (user_id, name, phone) values (current_setting('mpowered.test_owner')::uuid, 'Unauthorized', '+61400000000');
    raise exception 'Inserting for another owner must be rejected';
  exception when insufficient_privilege then null;
  end;
end $$;

select set_config('request.jwt.claim.sub', current_setting('mpowered.test_owner'), true);
delete from public.support_people where id = current_setting('mpowered.test_person')::uuid;
do $$
begin
  assert (select count(*) = 0 from public.support_people where id = current_setting('mpowered.test_person')::uuid), 'Owner removal must persist';
end $$;

set local role anon;
do $$
begin
  begin
    perform 1 from public.support_people limit 1;
    raise exception 'Signed-out reads must be rejected';
  exception when insufficient_privilege then null;
  end;
end $$;

reset role;
rollback;
