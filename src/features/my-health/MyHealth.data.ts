import type {
  AssessmentRecord,
  AssessmentRecordDraft,
  PrescriptionInput,
} from './MyHealth.types';

import {
  getAssessmentCycleEnd,
  parseLocalDateKey,
  toLocalDateKey,
} from '@/features/assessment-cycle/AssessmentCycle.data';

export const myHealthCopy = {
  title: 'My Health',
  profileReady:
    'Your Mpowered Health Profile has been created',
  profilePending:
    'Your Mpowered Health Profile',
  profileDescription:
    'This pain profile is updated each time you complete your assessments.',
  profileEmpty:
    'Complete your weekly assessments to build your pain profile.',
  sessionNote:
    'Available during this session. Records reset when the app restarts.',
  trackingTitle:
    'My health tracking records',
  trackingEmpty:
    'No health tracking records yet',
  trackingDescription:
    'Complete a pain assessment to see your pain intensity over time.',
  prescriptionEmpty:
    'Prescriptions list is empty',
} as const;

export const assessmentLabels = {
  pain: 'My Pain',
  movement: 'My Movement',
  'personal-care': 'My Personal Care',
  'social-health': 'My Social Health',
  management: 'My Management',
} as const;

export const painMetrics = [
  {
    key: 'averagePain',
    label: 'Average',
  },
  {
    key: 'worstPain',
    label: 'Worst',
  },
  {
    key: 'mildestPain',
    label: 'Mildest',
  },
] as const;

export const strengthUnits = [
  'mg',
  'g',
  '%',
  'μg',
  'iu',
] as const;

export const medicationForms = [
  'Tablet',
  'Capsule',
  'Liquid',
  'Drops',
  'Injections',
  'Spray',
  'mL',
  'Patches',
] as const;

export const timeUnits = [
  'hour',
  'day',
  'week',
  'month',
] as const;

export const emptyPrescription:
  PrescriptionInput = {
  name: '',
  strength: '',
  strengthUnit: 'mg',
  form: 'Tablet',
  dosage: '',
  repeatEvery: '1',
  timeUnit: 'day',
};

export function isValidPrescription(
  input: PrescriptionInput,
) {
  const positiveDecimal = (
    value: string,
  ) =>
    /^(\d+(\.\d+)?|\.\d+)$/.test(
      value.trim(),
    ) &&
    Number(value) > 0;

  return (
    input.name.trim().length > 0 &&
    positiveDecimal(input.strength) &&
    positiveDecimal(input.dosage) &&
    /^\d+$/.test(
      input.repeatEvery.trim(),
    ) &&
    Number(input.repeatEvery) > 0
  );
}

export function prescriptionName(
  input: PrescriptionInput,
) {
  return `${input.name} ${input.strength} ${input.strengthUnit}`;
}

export function prescriptionSchedule(
  input: PrescriptionInput,
) {
  return `${input.dosage} ${input.form.toLowerCase()} per application · Every ${input.repeatEvery} ${input.timeUnit}${
    Number(input.repeatEvery) === 1
      ? ''
      : 's'
  }`;
}

export function formatWeek(
  cycleStart: string,
) {
  const start =
    parseLocalDateKey(
      cycleStart,
    );

  const cycleEnd =
    getAssessmentCycleEnd(
      cycleStart,
    );

  const end =
    parseLocalDateKey(
      cycleEnd,
    );

  const format = (
    date: Date,
  ) =>
    date.toLocaleDateString(
      'en-AU',
      {
        day: 'numeric',
        month: 'short',
      },
    );

  return `${format(start)} – ${format(end)} ${end.getFullYear()}`;
}

export function updateAssessmentRecords(
  records: AssessmentRecord[],
  draft: AssessmentRecordDraft,
  cycleStart?: string,
  date = new Date(),
) {
  const recordCycleStart =
    cycleStart ??
    toLocalDateKey(date);

  const id =
    `${recordCycleStart}:${draft.type}`;

  const snapshot:
    AssessmentRecordDraft =
    JSON.parse(
      JSON.stringify(draft),
    );

  const existing =
    records.find(
      (item) =>
        item.id === id,
    );

  if (
    existing &&
    JSON.stringify({
      type: existing.type,
      sections:
        existing.sections,
      pain: existing.pain,
      periodLabel:
        existing.periodLabel,
    }) ===
      JSON.stringify({
        type: snapshot.type,
        sections:
          snapshot.sections,
        pain: snapshot.pain,
        periodLabel:
          snapshot.periodLabel,
      })
  ) {
    return records;
  }

  const record = {
    ...snapshot,

    id,

    // This field now stores the assessment cycle start.
    weekStart:
      recordCycleStart,

    completedAt:
      date.toISOString(),
  };

  return [
    record,
    ...records.filter(
      (item) =>
        item.id !== id,
    ),
  ].sort(
    (a, b) =>
      b.completedAt.localeCompare(
        a.completedAt,
      ),
  );
}