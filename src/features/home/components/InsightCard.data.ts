export type PainTrendPoint = {
  date: string;
  averagePain: number;
};

export type PainInsight = {
  message: string;
  painTrend: PainTrendPoint[];
};

export const insightCardCopy = {
  heading: 'New insights for your MPowered plan.',
  checkPainHistoryLabel: 'Check pain history',
  planAppointmentLabel: 'Plan Appointment with doctors',
  checkPainGuideLabel: 'Check Pain Guide',
  dismissAccessibilityLabel: 'Dismiss insight',
} as const;