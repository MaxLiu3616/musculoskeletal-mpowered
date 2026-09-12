import { painLocations } from '@/features/my-health/HealthRecord.data';
import type { AssessmentRecord } from '@/features/my-health/MyHealth.types';

import type { AppointmentPlan, AppointmentQuestion, SupportPerson } from './CarePlanner.types';

export const carePlannerCopy = {
  title: 'Plan your visit with confidence',
  description: 'Get ready for your visit. Prepare questions, add support people, and keep notes during your appointments.',
  sessionNote: 'Available during this session. Plans and answers reset when the app restarts.',
  bookingNote: 'Add the date you have agreed with your healthcare practitioner. This plan does not book an appointment.',
  supportNote: 'You can nominate up to two people to help you prepare for your appointment, or skip this step.',
  accessNote: 'These choices are saved with your plan. Support people are not invited or given app access yet.',
  questionsNote: 'Select at least one question to add to your appointment plan.',
  painGuideUrl: 'https://muscha.org/pain-guide/',
};

export const healthServices = [
  'Not specified', 'General Practitioner (GP)', 'Physiotherapist', 'Rheumatologist',
  'Osteopath', 'Pain Medicine Specialist', 'Orthopaedic Surgeon', 'Occupational Therapist', 'Other',
] as const;

export function emptySupportPerson(): SupportPerson {
  return { name: '', phone: '', email: '', addQuestions: false, addAnswers: false };
}

export function isValidSupportPerson(person: SupportPerson) {
  const digits = person.phone.replace(/\D/g, '');
  return person.name.trim().length > 0 && digits.length >= 6 && digits.length <= 15
    && /^[+\d\s().-]+$/.test(person.phone.trim())
    && (!person.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email.trim()));
}

export function localDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function isValidAppointmentDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDateKey(date) === value;
}

export function formatAppointmentDate(value: string) {
  return isValidAppointmentDate(value)
    ? new Date(`${value}T12:00:00`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not selected';
}

// Questions are templates from requirements pages 66–68, using recorded values only.
export function suggestedQuestions(records: AssessmentRecord[]): AppointmentQuestion[] {
  const questions: AppointmentQuestion[] = [];
  const add = (id: string, category: string, text: string) => questions.push({ id, category, text });
  const pain = [...records].sort((a, b) => b.completedAt.localeCompare(a.completedAt)).find((record) => record.type === 'pain')?.pain;
  if (pain) {
    const locations = painLocations(pain);
    if (locations.length) add('pain-location', 'Pain location', `What could be causing pain in my ${locations.join(', ').toLowerCase()}?`);
    if (locations.length > 1) add('related-locations', 'Pain location', 'Are these areas related, or are they likely separate issues?');
    if (pain.averagePain !== null) add('average-pain', 'Pain intensity', `My recorded average pain is ${pain.averagePain}/10. What does this indicate?`);
    if (pain.worstPain !== null && pain.currentPain !== null && pain.worstPain > pain.currentPain) {
      add('pain-flares', 'Pain intensity', `My pain has reached ${pain.worstPain}/10, compared with ${pain.currentPain}/10 when I completed my assessment. What could explain these changes?`);
    }
    if (pain.mildestPain !== null && pain.worstPain !== null && pain.mildestPain < pain.worstPain) {
      add('pain-range', 'Pain intensity', `Is it normal for my pain to vary between ${pain.mildestPain}/10 and ${pain.worstPain}/10?`);
    }
  }
  const has = (type: AssessmentRecord['type']) => records.some((record) => record.type === type);
  if (!records.length || has('movement')) {
    add('mobility', 'Pain impact', 'What treatments or therapies could help improve my mobility?');
    add('physiotherapy', 'Pain impact', 'Would physiotherapy or a specific exercise program be appropriate for me?');
    add('activities', 'Pain impact', 'Are there movements or activities I should avoid right now?');
  }
  if (!records.length || has('personal-care')) {
    add('daily-tasks', 'Pain impact', 'Are there strategies, aids, or supports that could help with daily tasks?');
  }
  if (has('social-health')) add('social-support', 'Pain impact', 'What support could help me manage the effects of pain on my social life and mood?');
  add('investigations', 'Management', 'Are there additional investigations or referrals that might help?');
  add('high-pain-days', 'Management', 'What can I do to better manage days when the pain is high?');
  add('goals', 'Management', 'What are realistic goals for improving my function and independence?');
  if (has('management')) add('treatment-plan', 'Management', 'Should we adjust my current pain management plan?');
  return questions;
}

export function createAppointmentDraft(id: string, records: AssessmentRecord[], now = new Date()): AppointmentPlan {
  return {
    id, appointmentDate: '', doctorName: '', service: 'Not specified', supportPeople: [],
    questions: suggestedQuestions(records), selectedIds: [], generatedAt: now.toISOString(),
    hasAssessments: records.length > 0, consent: null, answers: {},
  };
}

export function selectedQuestions(plan: AppointmentPlan) {
  return plan.questions.filter((question) => plan.selectedIds.includes(question.id));
}

export function isValidPlan(plan: AppointmentPlan) {
  return isValidAppointmentDate(plan.appointmentDate) && plan.supportPeople.length <= 2
    && plan.supportPeople.every(isValidSupportPerson) && selectedQuestions(plan).length > 0;
}

export function changePlanQuestions(plan: AppointmentPlan, ids: string[]): AppointmentPlan {
  const selectedIds = plan.questions.filter((question) => ids.includes(question.id)).map((question) => question.id);
  return selectedIds.length ? { ...plan, selectedIds } : plan;
}

export function hasSignature(paths: string[]) {
  return paths.some((path) => path.includes(' L '));
}
