/// <reference types="node" />
import assert from 'node:assert/strict';
import test from 'node:test';

import { getSupportPersonError, sameSupportPerson } from '../src/features/setting/SupportPeople.data';

const person = { name: 'Alex Example', phone: '+61 400 000 000', email: '' };

test('support contacts require a name and a valid phone number', () => {
  assert.equal(getSupportPersonError(person), '');
  for (const phone of ['', '123', 'call0400000000', '04+00000000', '++61400000000', '1234567890123456']) {
    assert.match(getSupportPersonError({ ...person, phone }), /phone number/i, phone);
  }
  assert.match(getSupportPersonError({ ...person, name: '   ' }), /name/i);
  for (const phone of ['0400 000 000', '(03) 9000-0000', '+44 20 7946 0000']) {
    assert.equal(getSupportPersonError({ ...person, phone }), '', phone);
  }
});

test('email is optional, but a supplied email must be valid', () => {
  assert.equal(getSupportPersonError({ ...person, email: '  alex@example.com  ' }), '');
  assert.equal(getSupportPersonError({ ...person, email: '  ' }), '');
  for (const email of ['alex@', 'alex.example.com', 'alex @example.com']) {
    assert.match(getSupportPersonError({ ...person, email }), /email/i);
  }
});

test('the same person is recognised across Australian phone formats', () => {
  assert.equal(sameSupportPerson(person, { ...person, name: ' alex example ', phone: '0400000000' }), true);
  assert.equal(sameSupportPerson(person, { ...person, phone: '+61400000001' }), false);
  assert.equal(sameSupportPerson(person, { ...person, name: 'Another Person' }), false);
});
