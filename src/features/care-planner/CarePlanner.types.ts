export type SupportPerson = {
  name: string;
  phone: string;
  email: string;
  addQuestions: boolean;
  addAnswers: boolean;
};

export type AppointmentQuestion = {
  id: string;
  category: string;
  text: string;
};

export type AppointmentAnswer = {
  text: string;
  audioUri?: string;
};

export type AppointmentPlan = {
  id: string;
  appointmentDate: string;
  doctorName: string;
  service: string;
  supportPeople: SupportPerson[];
  questions: AppointmentQuestion[];
  selectedIds: string[];
  generatedAt: string;
  hasAssessments: boolean;
  consent: { paths: string[]; signedAt: string } | null;
  answers: Record<string, AppointmentAnswer>;
};
