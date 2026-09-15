const DAY_COUNT_PER_CYCLE = 7;

export function toLocalDateKey(
  date = new Date(),
) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseLocalDateKey(
  dateKey: string,
) {
  const [
    yearText,
    monthText,
    dayText,
  ] = dateKey.split('-');

  return new Date(
    Number(yearText),
    Number(monthText) - 1,
    Number(dayText),
    12,
    0,
    0,
    0,
  );
}

export function addDaysToDateKey(
  dateKey: string,
  days: number,
) {
  const date =
    parseLocalDateKey(dateKey);

  date.setDate(
    date.getDate() + days,
  );

  return toLocalDateKey(date);
}

export function getAssessmentCycleEnd(
  cycleStart: string,
) {
  return addDaysToDateKey(
    cycleStart,
    DAY_COUNT_PER_CYCLE - 1,
  );
}

export function isDateInAssessmentCycle(
  date: Date,
  cycleStart: string,
) {
  const currentDate =
    toLocalDateKey(date);

  const cycleEnd =
    getAssessmentCycleEnd(
      cycleStart,
    );

  return (
    currentDate >= cycleStart &&
    currentDate <= cycleEnd
  );
}

export function formatAssessmentCyclePeriod(
  cycleStart: string,
) {
  const start =
    parseLocalDateKey(cycleStart);

  const cycleEnd =
    getAssessmentCycleEnd(
      cycleStart,
    );

  const end =
    parseLocalDateKey(cycleEnd);

  const monthFormatter =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        month: 'short',
      },
    );

  const startMonth =
    monthFormatter.format(start);

  const endMonth =
    monthFormatter.format(end);

  if (
    start.getFullYear() ===
      end.getFullYear() &&
    start.getMonth() ===
      end.getMonth()
  ) {
    return `${start.getDate()}-${end.getDate()} ${endMonth}`;
  }

  if (
    start.getFullYear() ===
    end.getFullYear()
  ) {
    return `${start.getDate()} ${startMonth}-${end.getDate()} ${endMonth}`;
  }

  return `${start.getDate()} ${startMonth} ${start.getFullYear()}-${end.getDate()} ${endMonth} ${end.getFullYear()}`;
}

export function formatAssessmentUpdatedAt(
  date = new Date(),
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(date);
}