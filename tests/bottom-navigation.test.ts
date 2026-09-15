/// <reference types="node" />

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  bottomNavigationItems,
  getActiveBottomNavigationItem,
} from '../src/components/navigation/BottomNavigation.data';

test('splash and every onboarding step omit the main navigation', () => {
  for (const route of ['/', '/onboarding', '/onboarding/name', '/onboarding/login-information/verification']) {
    assert.equal(getActiveBottomNavigationItem(route), null, route);
  }
});

test('detail pages and assessments highlight their parent section', () => {
  const routes = {
    '/home': 'pain-tracker',
    '/reflection': 'pain-tracker',
    '/assessment/pain/summary': 'pain-tracker',
    '/assessment/movement': 'pain-tracker',
    '/assessment/personal-care/care': 'pain-tracker',
    '/assessment/social-health/mood': 'pain-tracker',
    '/assessment/management/summary': 'pain-tracker',
    '/my-health/profile': 'my-health',
    '/my-health/prescriptions/123': 'my-health',
    '/care-planner/appointment': 'care-planner',
    '/care-planner/123/consent': 'care-planner',
    '/setting/display': 'setting',
    '/setting/verify-new-phone': 'setting',
  };

  for (const [route, section] of Object.entries(routes)) {
    assert.equal(getActiveBottomNavigationItem(route), section, route);
  }
});

test('each navigation button opens its own section root', () => {
  assert.deepEqual(bottomNavigationItems.map(item => item.href), [
    '/home', '/my-health', '/care-planner', '/setting',
  ]);
  for (const item of bottomNavigationItems) {
    assert.equal(getActiveBottomNavigationItem(item.href), item.id);
  }
});
