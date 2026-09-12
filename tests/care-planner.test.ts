/// <reference types="node" />
// Run with: npx tsx --test tests/care-planner.test.ts
import assert from 'node:assert/strict';
import test from 'node:test';

import { changePlanQuestions, createAppointmentDraft, emptySupportPerson, formatAppointmentDate, hasSignature, isValidAppointmentDate, isValidPlan, isValidSupportPerson, localDateKey, suggestedQuestions } from '../src/features/care-planner/CarePlanner.data';
import type { AssessmentRecord } from '../src/features/my-health/MyHealth.types';

const painRecord = (completedAt = '2026-09-10T00:00:00Z'): AssessmentRecord => ({
  id: completedAt, type: 'pain', completedAt, weekStart: '2026-09-07', sections: [],
  pain: { locations: ['knee', 'other'], otherLocation: 'Left wrist', characteristics: ['aching'], currentPain: 0, mildestPain: 0, worstPain: 10, averagePain: 0 },
});

test('calendar dates preserve local days and reject impossible dates', () => {
  assert.equal(localDateKey(new Date(2026, 8, 10, 0, 1)), '2026-09-10');
  for (const value of ['', '2026-02-29', '2026-09-31', '2026-13-01', '10/09/2026']) assert.equal(isValidAppointmentDate(value), false, value);
  assert.equal(isValidAppointmentDate('2028-02-29'), true);
  assert.equal(formatAppointmentDate('2026-09-10'), '10 September 2026');
});

test('support people require name and phone, with optional valid email', () => {
  const person = { ...emptySupportPerson(), name: 'Test Support', phone: '+61 400 000 000' };
  assert.equal(isValidSupportPerson(person), true);
  assert.equal(isValidSupportPerson({ ...person, email: 'support@example.com' }), true);
  for (const changes of [{ name: '  ' }, { phone: 'abc123456' }, { phone: '123' }, { email: 'invalid@' }]) {
    assert.equal(isValidSupportPerson({ ...person, ...changes }), false);
  }
});

test('empty assessments provide general questions without invented pain values', () => {
  const questions = suggestedQuestions([]);
  assert.ok(questions.length > 0);
  assert.equal(questions.some((question) => question.category === 'Pain intensity'), false);
  assert.doesNotMatch(JSON.stringify(questions), /lower back|7\/10|9\/10/);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);
});

test('personalised questions preserve zero, custom locations and the latest assessment', () => {
  const older = painRecord('2026-09-01T00:00:00Z');
  older.pain!.averagePain = 7;
  const questions = suggestedQuestions([older, painRecord()]);
  assert.match(questions.find((question) => question.id === 'pain-location')!.text, /knee, left wrist/);
  assert.match(questions.find((question) => question.id === 'average-pain')!.text, /0\/10/);
  assert.match(questions.find((question) => question.id === 'pain-range')!.text, /0\/10 and 10\/10/);
  assert.doesNotMatch(questions.find((question) => question.id === 'average-pain')!.text, /7\/10/);
});

test('plans require a date, at least one known question and at most two valid support people', () => {
  const draft = createAppointmentDraft('test', []);
  assert.equal(isValidPlan(draft), false);
  draft.appointmentDate = '2026-09-10';
  draft.selectedIds = ['unknown'];
  assert.equal(isValidPlan(draft), false);
  draft.selectedIds = [draft.questions[0].id];
  assert.equal(isValidPlan(draft), true);
  const person = { ...emptySupportPerson(), name: 'Support', phone: '0400000000' };
  draft.supportPeople = [person, person];
  assert.equal(isValidPlan(draft), true);
  draft.supportPeople.push(person);
  assert.equal(isValidPlan(draft), false);
});

test('modifying questions preserves recorded answers and does not mutate the saved plan', () => {
  const plan = createAppointmentDraft('test', []);
  const [first, second] = plan.questions;
  plan.selectedIds = [first.id];
  plan.answers = { [first.id]: { text: 'Test answer', audioUri: 'file:///test.m4a' } };
  const changed = changePlanQuestions(plan, [second.id, second.id, 'unknown']);
  assert.deepEqual(changed.selectedIds, [second.id]);
  assert.deepEqual(plan.selectedIds, [first.id]);
  assert.deepEqual(changed.answers[first.id], plan.answers[first.id]);
  assert.equal(changePlanQuestions(plan, []), plan);
  assert.equal(changePlanQuestions(plan, ['unknown']), plan);
});

test('new plans have independent questions, answers and consent', () => {
  const now = new Date('2026-09-10T04:00:00Z');
  const records = [painRecord()];
  const first = createAppointmentDraft('first', records, now);
  const second = createAppointmentDraft('second', records, now);
  first.questions[0].text = 'Modified';
  first.answers[first.questions[0].id] = { text: 'Answer' };
  assert.notEqual(second.questions[0].text, 'Modified');
  assert.deepEqual(second.answers, {});
  assert.equal(second.consent, null);
  assert.equal(second.generatedAt, now.toISOString());
  assert.equal(second.hasAssessments, true);
});

test('consent requires a drawn stroke rather than an empty pad or tap', () => {
  assert.equal(hasSignature([]), false);
  assert.equal(hasSignature(['M 10 10']), false);
  assert.equal(hasSignature(['M 10 10 L 20 20']), true);
});
