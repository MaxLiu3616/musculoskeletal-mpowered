/// <reference types="node" />
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import * as validation from '../src/features/setting/SupportPeople.data';

const input = { name: ' Alex ', phone: ' 0400 000 000 ', email: ' alex@example.com ', canAddQuestions: true, canViewAnswers: false };
const row = { id: 'person-1', user_id: 'owner-1', name: 'Alex', phone: '0400 000 000', email: 'alex@example.com', can_add_questions: true, can_view_answers: false };

function service({ userId = 'owner-1', error = null as unknown, data = row as unknown } = {}) {
  const calls: [string, ...unknown[]][] = [];
  const result = { data, error };
  const query = {
    select: (...args: unknown[]) => { calls.push(['select', ...args]); return query; },
    eq: (...args: unknown[]) => { calls.push(['eq', ...args]); return query; },
    insert: (...args: unknown[]) => { calls.push(['insert', ...args]); return query; },
    update: (...args: unknown[]) => { calls.push(['update', ...args]); return query; },
    delete: () => { calls.push(['delete']); return query; },
    order: async () => result,
    single: async () => result,
  };
  const supabase = {
    auth: { getUser: async () => ({ data: { user: userId ? { id: userId } : null }, error: null }) },
    from: (table: string) => { calls.push(['from', table]); return query; },
  };
  const code = ts.transpileModule(readFileSync('src/services/supportPeople.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)(
    (id: string) => id === './supabase' ? { supabase } : validation, module, module.exports,
  );
  return { api: module.exports as typeof import('../src/services/supportPeople'), calls };
}

test('create waits for the database and returns the saved identity and preferences', async () => {
  const { api, calls } = service();
  const saved = await api.createSupportPerson(input, 'owner-1');
  assert.deepEqual(saved, { id: 'person-1', name: 'Alex', phone: '0400 000 000', email: 'alex@example.com', canAddQuestions: true, canViewAnswers: false });
  assert.deepEqual(calls.find(([name]) => name === 'insert')?.[1], { user_id: 'owner-1', name: 'Alex', phone: '0400 000 000', email: 'alex@example.com', can_add_questions: true, can_view_answers: false });
});

test('invalid contact data never reaches the database', async () => {
  const { api, calls } = service();
  await assert.rejects(api.createSupportPerson({ ...input, phone: 'abc' }, 'owner-1'), /phone number/);
  await assert.rejects(api.updateSupportPerson('person-1', { ...input, email: 'bad@' }, 'owner-1'), /email/);
  assert.equal(calls.length, 0);
});

test('every operation rejects a changed or missing account before accessing rows', async () => {
  for (const userId of ['', 'owner-2']) {
    const { api, calls } = service({ userId });
    for (const action of [
      () => api.loadSupportPeople('owner-1'),
      () => api.createSupportPerson(input, 'owner-1'),
      () => api.updateSupportPerson('person-1', input, 'owner-1'),
      () => api.deleteSupportPerson('person-1', 'owner-1'),
    ]) await assert.rejects(action(), /account has changed/);
    assert.equal(calls.length, 0);
  }
});

test('update and removal are restricted to both the contact and its owner', async () => {
  for (const action of ['update', 'delete']) {
    const { api, calls } = service();
    if (action === 'update') await api.updateSupportPerson('person-1', input, 'owner-1');
    else await api.deleteSupportPerson('person-1', 'owner-1');
    assert.deepEqual(calls.filter(([name]) => name === 'eq'), [['eq', 'id', 'person-1'], ['eq', 'user_id', 'owner-1']]);
  }
});

test('database failures are returned to callers, including a missing deleted row', async () => {
  const failure = { code: 'PGRST116', message: 'No row returned' };
  const { api } = service({ error: failure, data: null });
  for (const action of [
    () => api.loadSupportPeople('owner-1'),
    () => api.createSupportPerson(input, 'owner-1'),
    () => api.updateSupportPerson('person-1', input, 'owner-1'),
    () => api.deleteSupportPerson('person-1', 'owner-1'),
  ]) await assert.rejects(action(), error => error === failure);
});

test('loading restores null optional fields without losing saved preferences', async () => {
  const { api, calls } = service({ data: [{ ...row, phone: null, email: null, can_view_answers: true }] });
  const [saved] = await api.loadSupportPeople('owner-1');
  assert.equal(saved.phone, '');
  assert.equal(saved.email, '');
  assert.equal(saved.canViewAnswers, true);
  assert.ok(calls.some(call => call[0] === 'eq' && call[1] === 'user_id' && call[2] === 'owner-1'));
});
