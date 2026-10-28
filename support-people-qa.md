# Support people verification

Verified on 28 October 2026 against the current backend implementation on `main`.

## Scope

- Add, edit and remove contacts in Settings, persisted to the signed-in Supabase account.
- Require a name and valid phone number; validate optional email and detect an existing name/phone combination, including equivalent Australian phone formats.
- Import a native phone contact, with a number chooser for contacts containing multiple numbers and manual entry when a number is absent.
- Reuse saved contacts in Care Planner; save new contacts for future appointments; select at most two people per appointment.
- Preserve entered details on failed writes and prevent stale saves or contact data from carrying into another account.
- Store access preferences only. Invitations and support-person account access remain undefined in the requirements and are not implemented. Viewing answers is not treated as permission to add an answer.

## Automated checks

- `npx --yes tsx --test tests/*.test.ts`: 33 tests passed, including validation, account ownership, persistence payloads and failure propagation.
- `npx tsc --noEmit`: passed.
- `npx expo export --platform all`: web, iOS and Android bundles exported successfully.
- `git diff --check`: passed.

## Browser checks

The app was exercised against an isolated local Supabase test double with synthetic users and contacts. No SMS was sent and no real contact data was used.

- Required fields, invalid phone/email, duplicate detection, creation, editing and restoration after reload passed.
- Simulated create and delete failures preserved the form/list; retry succeeded.
- Two saved people appeared in a saved appointment; selecting a third person was unavailable.
- A contact entered in Care Planner became reusable from the account's saved contacts.
- Skip followed by Back returned to an empty support selection.
- A second account had an empty contact list. A delayed save followed by logout/sign-in did not expose the old account's contact or trigger late navigation.
- The contact list was visually checked at a 390 × 844 viewport. No console errors were captured in the final check.

## Live database checks

`tests/support-people-rls.sql` passed on the MPOWERED database over a certificate-verified connection. It tested owner CRUD and rejected cross-account reads, writes, deletion, reassignment and anonymous reads. All synthetic fixtures were inside a rolled-back transaction.

The SQL in `20261028023315_restrict_support_people_privileges.sql` was applied directly to the existing database and verified. It removes unnecessary table-wide privileges from app roles while preserving authenticated CRUD through the existing row-level policies. The migration file is retained for other environments; it was not registered in Supabase migration history.

The native contacts picker was bundled for iOS and Android but was not exercised on a device. Browser persistence checks used the test double; live database checks were separate, rather than a real two-device end-to-end test.
