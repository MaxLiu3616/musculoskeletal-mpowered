-- Support people are managed through row-level CRUD policies. These table-wide
-- privileges are not needed by app users and are not protected by those policies.
revoke truncate, references, trigger on table public.support_people from anon, authenticated;
