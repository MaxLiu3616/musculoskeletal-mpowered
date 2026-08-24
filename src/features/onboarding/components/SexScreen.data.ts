export const sexOptions = [
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say' },
] as const;

export type SexOptionId = (typeof sexOptions)[number]['id'];

export const sexScreenCopy = {
  title: 'Your sex',
  continueLabel: 'Continue',
  researchMessage:
    'Research shows that people may experience pain differently depending on their sex',
} as const;
