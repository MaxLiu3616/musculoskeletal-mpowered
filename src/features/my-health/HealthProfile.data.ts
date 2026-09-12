import type { HealthProfileDetails } from '@/features/onboarding/OnboardingContext';
import { conditionOptions } from '@/features/onboarding/components/HealthConditionsScreen.data';
import { sexOptions } from '@/features/onboarding/components/SexScreen.data';

import { assessmentLabels, formatWeek } from './MyHealth.data';
import type { AssessmentRecord, HealthSection } from './MyHealth.types';

function ageGroup(yearOfBirth: string) {
  if (!yearOfBirth) return 'Not recorded';
  const age = new Date().getFullYear() - Number(yearOfBirth);
  if (age < 18) return 'Under 18';
  if (age < 25) return '18–24';
  if (age >= 65) return '65+';
  const start = Math.floor((age - 25) / 10) * 10 + 25;
  return `${start}–${start + 9}`;
}

export function healthProfileSections(name: string, profile: HealthProfileDetails, records: AssessmentRecord[]): HealthSection[] {
  return [
    { title: 'Your information', items: [
      { label: 'Name', value: name || 'Not recorded' },
      { label: 'Sex', value: sexOptions.find((item) => item.id === profile.sex)?.label ?? 'Not recorded' },
      { label: 'Age group (based on birth year)', value: ageGroup(profile.yearOfBirth) },
    ] },
    { title: 'Conditions', items: [
      { label: 'Diagnosis from a doctor', value: profile.diagnosis === null ? 'Not recorded' : profile.diagnosis === 'yes' ? 'Yes' : 'No' },
      { label: 'Primary conditions', value: conditionOptions.filter((item) => profile.conditions.includes(item.id)).map((item) => item.label).join(', ') || 'Not recorded' },
      { label: 'Other conditions', value: profile.otherConditions || 'Not recorded' },
    ] },
    ...Object.entries(assessmentLabels).flatMap(([type, label]) => {
      const record = records.find((item) => item.type === type);
      return record ? record.sections.map((section) => ({ ...section, items: [
        { label: 'Assessment period', value: record.periodLabel ?? formatWeek(record.weekStart) }, ...section.items,
      ] })) : [{ title: label, items: [{ label: 'Assessment', value: 'Not recorded yet.' }] }];
    }),
  ];
}
