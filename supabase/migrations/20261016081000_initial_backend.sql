-- MPowered initial backend schema

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $function$
begin
  new.updated_at = now();
return new;
end;
$function$;


-- =========================================================
-- User profiles
-- =========================================================

create table public.user_profiles (
                                      user_id uuid not null,
                                      name text,
                                      sex text,
                                      year_of_birth integer,
                                      diagnosis text,
                                      conditions text[] not null default '{}',
                                      other_conditions text,
                                      created_at timestamptz not null default now(),
                                      updated_at timestamptz not null default now(),

                                      constraint user_profiles_pkey
                                          primary key (user_id),

                                      constraint user_profiles_user_id_fkey
                                          foreign key (user_id)
                                              references auth.users(id)
                                              on delete cascade
);


-- =========================================================
-- User settings
-- =========================================================

create table public.user_settings (
                                      user_id uuid not null,
                                      weekly_reminders boolean not null default true,
                                      appointment_reminders boolean not null default true,
                                      text_size text not null default 'medium',
                                      created_at timestamptz not null default now(),
                                      updated_at timestamptz not null default now(),

                                      constraint user_settings_pkey
                                          primary key (user_id),

                                      constraint user_settings_user_id_fkey
                                          foreign key (user_id)
                                              references auth.users(id)
                                              on delete cascade,

                                      constraint user_settings_text_size_check
                                          check (
                                              text_size = any (
                                                               array[
                                                                   'small'::text,
                                                               'medium'::text,
                                                               'large'::text
        ]
                                                  )
                                              )
);


-- =========================================================
-- Reflection notes
-- =========================================================

create table public.reflection_notes (
                                         user_id uuid not null,
                                         notes text not null default '',
                                         created_at timestamptz not null default now(),
                                         updated_at timestamptz not null default now(),

                                         constraint reflection_notes_pkey
                                             primary key (user_id),

                                         constraint reflection_notes_user_id_fkey
                                             foreign key (user_id)
                                                 references auth.users(id)
                                                 on delete cascade
);


-- =========================================================
-- Prescriptions
-- =========================================================

create table public.prescriptions (
                                      id uuid not null default gen_random_uuid(),
                                      user_id uuid not null,
                                      name text not null,
                                      strength numeric not null,
                                      strength_unit text not null,
                                      form text not null,
                                      dosage numeric not null,
                                      repeat_every integer not null,
                                      time_unit text not null,
                                      created_at timestamptz not null default now(),
                                      updated_at timestamptz not null default now(),

                                      constraint prescriptions_pkey
                                          primary key (id),

                                      constraint prescriptions_user_id_fkey
                                          foreign key (user_id)
                                              references auth.users(id)
                                              on delete cascade,

                                      constraint prescriptions_strength_positive_check
                                          check (
                                              strength > 0
                                              ),

                                      constraint prescriptions_dosage_positive_check
                                          check (
                                              dosage > 0
                                              ),

                                      constraint prescriptions_repeat_every_positive_check
                                          check (
                                              repeat_every > 0
                                              ),

                                      constraint prescriptions_strength_unit_check
                                          check (
                                              strength_unit = any (
                                                                   array[
                                                                       'mg'::text,
                                                                   'g'::text,
                                                                   '%'::text,
                                                                   'μg'::text,
                                                                   'iu'::text
        ]
                                                  )
                                              ),

                                      constraint prescriptions_form_check
                                          check (
                                              form = any (
                                                          array[
                                                              'Tablet'::text,
                                                          'Capsule'::text,
                                                          'Liquid'::text,
                                                          'Drops'::text,
                                                          'Injections'::text,
                                                          'Spray'::text,
                                                          'mL'::text,
                                                          'Patches'::text
        ]
                                                  )
                                              ),

                                      constraint prescriptions_time_unit_check
                                          check (
                                              time_unit = any (
                                                               array[
                                                                   'hour'::text,
                                                               'day'::text,
                                                               'week'::text,
                                                               'month'::text
        ]
                                                  )
                                              )
);


-- =========================================================
-- Assessment cycles
-- =========================================================

create table public.assessment_cycles (
                                          id uuid not null default gen_random_uuid(),
                                          user_id uuid not null,
                                          cycle_start date not null,
                                          created_at timestamptz not null default now(),

                                          constraint assessment_cycles_pkey
                                              primary key (id),

                                          constraint assessment_cycles_user_id_fkey
                                              foreign key (user_id)
                                                  references auth.users(id)
                                                  on delete cascade,

                                          constraint assessment_cycles_user_cycle_unique
                                              unique (user_id, cycle_start)
);


-- =========================================================
-- Assessment summaries
-- =========================================================

create table public.assessment_summaries (
                                             id uuid not null default gen_random_uuid(),
                                             user_id uuid not null,
                                             cycle_id uuid not null,
                                             assessment_type text not null,
                                             summary_data jsonb not null default '{}'::jsonb,
                                             average_pain numeric,
                                             worst_pain numeric,
                                             mildest_pain numeric,
                                             created_at timestamptz not null default now(),
                                             updated_at timestamptz not null default now(),

                                             constraint assessment_summaries_pkey
                                                 primary key (id),

                                             constraint assessment_summaries_user_id_fkey
                                                 foreign key (user_id)
                                                     references auth.users(id)
                                                     on delete cascade,

                                             constraint assessment_summaries_cycle_id_fkey
                                                 foreign key (cycle_id)
                                                     references public.assessment_cycles(id)
                                                     on delete cascade,

                                             constraint assessment_summaries_cycle_type_unique
                                                 unique (
                                                         cycle_id,
                                                         assessment_type
                                                     ),

                                             constraint assessment_summaries_type_check
                                                 check (
                                                     assessment_type = any (
                                                                            array[
                                                                                'pain'::text,
                                                                            'movement'::text,
                                                                            'personal-care'::text,
                                                                            'social-health'::text,
                                                                            'management'::text
        ]
                                                         )
                                                     ),

                                             constraint assessment_summaries_average_pain_check
                                                 check (
                                                     average_pain is null
                                                         or (
                                                         average_pain >= 0
                                                             and average_pain <= 10
                                                         )
                                                     ),

                                             constraint assessment_summaries_worst_pain_check
                                                 check (
                                                     worst_pain is null
                                                         or (
                                                         worst_pain >= 0
                                                             and worst_pain <= 10
                                                         )
                                                     ),

                                             constraint assessment_summaries_mildest_pain_check
                                                 check (
                                                     mildest_pain is null
                                                         or (
                                                         mildest_pain >= 0
                                                             and mildest_pain <= 10
                                                         )
                                                     )
);


-- =========================================================
-- Support people
-- =========================================================

create table public.support_people (
                                       id uuid not null default gen_random_uuid(),
                                       user_id uuid not null,
                                       name text not null,
                                       phone text,
                                       email text,
                                       can_add_questions boolean not null default false,
                                       can_view_answers boolean not null default false,
                                       created_at timestamptz not null default now(),
                                       updated_at timestamptz not null default now(),

                                       constraint support_people_pkey
                                           primary key (id),

                                       constraint support_people_user_id_fkey
                                           foreign key (user_id)
                                               references auth.users(id)
                                               on delete cascade
);


-- =========================================================
-- Appointment plans
-- =========================================================

create table public.appointment_plans (
                                          id uuid not null default gen_random_uuid(),
                                          user_id uuid not null,
                                          appointment_date date,
                                          doctor_name text,
                                          service text,
                                          support_people jsonb not null default '[]'::jsonb,
                                          questions jsonb not null default '[]'::jsonb,
                                          consent jsonb,
                                          answers jsonb not null default '{}'::jsonb,
                                          selected_question_ids text[] not null default '{}',
                                          generated_at timestamptz,
                                          created_at timestamptz not null default now(),
                                          updated_at timestamptz not null default now(),
                                          has_assessments boolean not null default false,

                                          constraint appointment_plans_pkey
                                              primary key (id),

                                          constraint appointment_plans_user_id_fkey
                                              foreign key (user_id)
                                                  references auth.users(id)
                                                  on delete cascade,

                                          constraint appointment_plans_support_people_limit_check
                                              check (
                                                  jsonb_typeof(
                                                          support_people
                                                  ) = 'array'
                                                      and jsonb_array_length(
                                                                  support_people
                                                          ) <= 2
                                                  )
);


-- =========================================================
-- Updated-at triggers
-- =========================================================

create trigger set_user_profiles_updated_at
    before update
    on public.user_profiles
    for each row
    execute function public.set_updated_at();


create trigger set_user_settings_updated_at
    before update
    on public.user_settings
    for each row
    execute function public.set_updated_at();


create trigger set_reflection_notes_updated_at
    before update
    on public.reflection_notes
    for each row
    execute function public.set_updated_at();


create trigger set_prescriptions_updated_at
    before update
    on public.prescriptions
    for each row
    execute function public.set_updated_at();


create trigger set_assessment_summaries_updated_at
    before update
    on public.assessment_summaries
    for each row
    execute function public.set_updated_at();


create trigger set_support_people_updated_at
    before update
    on public.support_people
    for each row
    execute function public.set_updated_at();


create trigger set_appointment_plans_updated_at
    before update
    on public.appointment_plans
    for each row
    execute function public.set_updated_at();


-- =========================================================
-- Row level security
-- =========================================================

alter table public.user_profiles
    enable row level security;

alter table public.user_settings
    enable row level security;

alter table public.reflection_notes
    enable row level security;

alter table public.prescriptions
    enable row level security;

alter table public.assessment_cycles
    enable row level security;

alter table public.assessment_summaries
    enable row level security;

alter table public.support_people
    enable row level security;

alter table public.appointment_plans
    enable row level security;


-- =========================================================
-- RLS policies
-- =========================================================

create policy "Users can manage own profile"
on public.user_profiles
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own settings"
on public.user_settings
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own reflection"
on public.reflection_notes
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own prescriptions"
on public.prescriptions
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own assessment cycles"
on public.assessment_cycles
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own assessment summaries"
on public.assessment_summaries
for all
to authenticated
using (
  auth.uid() = user_id
  and exists (
    select 1
    from public.assessment_cycles
    where
      assessment_cycles.id =
        assessment_summaries.cycle_id
      and assessment_cycles.user_id =
        auth.uid()
  )
)
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.assessment_cycles
    where
      assessment_cycles.id =
        assessment_summaries.cycle_id
      and assessment_cycles.user_id =
        auth.uid()
  )
);


create policy "Users can manage own support people"
on public.support_people
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


create policy "Users can manage own appointment plans"
on public.appointment_plans
for all
to authenticated
using (
  auth.uid() = user_id
)
with check (
  auth.uid() = user_id
);


-- =========================================================
-- Permissions
-- =========================================================

grant usage
on schema public
to authenticated;


grant
    select,
    insert,
    update,
    delete
    on table public.user_profiles
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.user_settings
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.reflection_notes
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.prescriptions
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.assessment_cycles
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.assessment_summaries
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.support_people
    to authenticated;

grant
    select,
    insert,
    update,
    delete
    on table public.appointment_plans
    to authenticated;


revoke
    select,
    insert,
    update,
    delete
    on table public.user_profiles
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.user_settings
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.reflection_notes
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.prescriptions
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.assessment_cycles
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.assessment_summaries
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.support_people
    from anon;

revoke
    select,
    insert,
    update,
    delete
    on table public.appointment_plans
    from anon;