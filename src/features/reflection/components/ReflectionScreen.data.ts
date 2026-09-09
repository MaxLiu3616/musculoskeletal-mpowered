const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const reflectionScreenCopy = {
  backLabel: 'Back',
  headerTitle: 'Reflection',
  title: 'My Reflection This week',
  notesLabel: 'Notes',
  periodLabel: 'Period',
  prompt:
    'Write down any reflections on your pain experience and management this week',
  placeholder: 'Write your reflection here',
  saveLabel: 'Save',
} as const;

export function formatReflectionPeriod(date = new Date()) {
  const start = new Date(date);
  const day = start.getDay();

  start.setDate(
    start.getDate() + (day === 0 ? -6 : 1 - day),
  );

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const startMonth = monthNames[start.getMonth()];
  const endMonth = monthNames[end.getMonth()];

  if (startMonth === endMonth) {
    return `${start.getDate()}-${end.getDate()} ${endMonth}`;
  }

  return `${start.getDate()} ${startMonth}-${end.getDate()} ${endMonth}`;
}
