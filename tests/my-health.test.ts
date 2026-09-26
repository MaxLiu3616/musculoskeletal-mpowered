/// <reference types="node" />
// Run with: npx tsx --test tests/my-health.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  formatAssessmentCyclePeriod,
} from '../src/features/assessment-cycle/AssessmentCycle.data';

import {
  emptyPrescription,
  formatWeek,
  isValidPrescription,
  updateAssessmentRecords,
} from '../src/features/my-health/MyHealth.data';

import {
  healthReportHtml,
  painChartSvg,
} from '../src/features/my-health/HealthReport.data';

import type {
  AssessmentRecordDraft,
} from '../src/features/my-health/MyHealth.types';

import {
  managementSections,
  movementSections,
  personalCareSections,
  socialHealthSections,
} from '../src/features/my-health/HealthRecord.data';

const validPrescription = {
  ...emptyPrescription,
  name: 'Example',
  strength: '5',
  dosage: '0.5',
};

const painDraft =
  (): AssessmentRecordDraft => ({
    type: 'pain',

    sections: [
      {
        title: 'My Pain',
        items: [
          {
            label: 'Current pain',
            value: '0/10',
          },
        ],
      },
    ],

    pain: {
      locations: ['knee'],
      otherLocation: '',
      characteristics: ['aching'],
      currentPain: 0,
      averagePain: 0,
      worstPain: 10,
      mildestPain: 0,
    },
  });

test(
  'prescriptions allow fractional dosage and reject missing or nonpositive values',
  () => {
    assert.equal(
      isValidPrescription(
        validPrescription,
      ),
      true,
    );

    for (const input of [
      { name: '   ' },
      { strength: '' },
      { strength: '-1' },
      { strength: 'NaN' },
      { strength: '1e3' },
      { dosage: '0' },
      { dosage: 'Infinity' },
      { repeatEvery: '0' },
      { repeatEvery: '1.5' },
    ]) {
      assert.equal(
        isValidPrescription({
          ...validPrescription,
          ...input,
        }),
        false,
        JSON.stringify(input),
      );
    }
  },
);

test(
  'assessment cycles use the supplied cycle start for a fixed seven-day period',
  () => {
    assert.match(
      formatWeek(
        '2026-09-15',
      ),
      /15 Sept.*21 Sept 2026/,
    );

    assert.match(
      formatWeek(
        '2025-12-29',
      ),
      /29 Dec.*4 Jan 2026/,
    );
  },
);

test(
  'the period is absent before an assessment cycle exists',
  () => {
    assert.equal(formatAssessmentCyclePeriod(null), undefined);
  },
);

test(
  'the active assessment period stays anchored when reflection is opened later',
  (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: new Date(2026, 8, 30, 12).getTime() });
    assert.equal(formatAssessmentCyclePeriod('2026-09-26'), '26 Sept-2 Oct');
    t.mock.timers.setTime(new Date(2026, 9, 2, 23, 55).getTime());
    assert.equal(formatAssessmentCyclePeriod('2026-09-26'), '26 Sept-2 Oct');
    assert.equal(formatAssessmentCyclePeriod(null), undefined);
  },
);

test(
  'assessment periods handle month, year and leap-year boundaries',
  () => {
    const cases = [
      { start: '2026-09-26', expected: '26 Sept-2 Oct' },
      { start: '2026-12-29', expected: '29 Dec 2026-4 Jan 2027' },
      { start: '2024-02-28', expected: '28 Feb-5 Mar' },
    ];
    for (const { start, expected } of cases) {
      assert.equal(formatAssessmentCyclePeriod(start), expected);
    }
  },
);

test(
  'saved answers are snapshots independent from later draft edits',
  () => {
    const draft =
      painDraft();

    const saved =
      updateAssessmentRecords(
        [],
        draft,
        '2026-09-15',
        new Date(
          2026,
          8,
          15,
        ),
      );

    draft.pain!.locations.push(
      'neck',
    );

    draft.sections[0].items[0].value =
      '8/10';

    assert.deepEqual(
      saved[0].pain!.locations,
      ['knee'],
    );

    assert.equal(
      saved[0].sections[0]
        .items[0].value,
      '0/10',
    );
  },
);

test(
  'repeat completion updates the same cycle without deleting older or other assessments',
  () => {
    const draft =
      painDraft();

    let saved =
      updateAssessmentRecords(
        [],
        draft,
        '2026-09-01',
        new Date(
          2026,
          8,
          1,
        ),
      );

    saved =
      updateAssessmentRecords(
        saved,
        draft,
        '2026-09-08',
        new Date(
          2026,
          8,
          8,
        ),
      );

    saved =
      updateAssessmentRecords(
        saved,
        {
          type: 'movement',
          sections: [],
        },
        '2026-09-08',
        new Date(
          2026,
          8,
          9,
        ),
      );

    saved =
      updateAssessmentRecords(
        saved,
        {
          ...draft,

          pain: {
            ...draft.pain!,
            averagePain: 7,
          },
        },
        '2026-09-08',
        new Date(
          2026,
          8,
          10,
        ),
      );

    assert.equal(
      saved.length,
      3,
    );

    assert.equal(
      saved.find(
        (record) =>
          record.id ===
          '2026-09-08:pain',
      )!.pain!.averagePain,
      7,
    );

    assert.equal(
      saved.find(
        (record) =>
          record.id ===
          '2026-09-01:pain',
      )!.pain!.averagePain,
      0,
    );

    assert.equal(
      saved.filter(
        (record) =>
          record.type ===
          'movement',
      ).length,
      1,
    );
  },
);

test(
  'reopening an unchanged summary in the same cycle does not change its saved date',
  () => {
    const draft =
      painDraft();

    const saved =
      updateAssessmentRecords(
        [],
        draft,
        '2026-09-15',
        new Date(
          2026,
          8,
          15,
        ),
      );

    const reopened =
      updateAssessmentRecords(
        saved,
        draft,
        '2026-09-15',
        new Date(
          2026,
          8,
          18,
        ),
      );

    assert.equal(
      reopened,
      saved,
    );

    assert.equal(
      reopened[0].completedAt,
      saved[0].completedAt,
    );
  },
);

test(
  'a new cycle creates a new history record',
  () => {
    const draft =
      painDraft();

    let saved =
      updateAssessmentRecords(
        [],
        draft,
        '2026-09-15',
        new Date(
          2026,
          8,
          15,
        ),
      );

    saved =
      updateAssessmentRecords(
        saved,
        {
          ...draft,

          pain: {
            ...draft.pain!,
            averagePain: 6,
          },
        },
        '2026-09-22',
        new Date(
          2026,
          8,
          22,
        ),
      );

    assert.equal(
      saved.length,
      2,
    );

    assert.ok(
      saved.some(
        (record) =>
          record.id ===
          '2026-09-15:pain',
      ),
    );

    assert.ok(
      saved.some(
        (record) =>
          record.id ===
          '2026-09-22:pain',
      ),
    );
  },
);

test(
  'charts preserve zero and ten on the fixed scale, including one-point charts',
  () => {
    const saved =
      updateAssessmentRecords(
        [],
        painDraft(),
        '2026-09-15',
        new Date(
          2026,
          8,
          15,
        ),
      );

    const average =
      painChartSvg(
        saved,
        'averagePain',
      );

    assert.match(
      average.xml,
      /cy="224"/,
    );

    assert.match(
      painChartSvg(
        saved,
        'worstPain',
      ).xml,
      /cy="24"/,
    );

    assert.doesNotMatch(
      average.xml,
      /NaN|Infinity/,
    );
  },
);

test(
  'PDF content escapes user text and preserves all summary sections',
  () => {
    const html =
      healthReportHtml(
        'My <Profile>',
        [
          {
            title:
              'Conditions',

            items: [
              {
                label:
                  'Other',

                value:
                  '<script>alert(1)</script> & notes',
              },
            ],
          },
        ],
      );

    assert.match(
      html,
      /My &lt;Profile&gt;/,
    );

    assert.match(
      html,
      /&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; notes/,
    );

    assert.doesNotMatch(
      html,
      /<script>/,
    );
  },
);

test(
  'movement and personal care summaries preserve zero scores and final reflections',
  () => {
    const movement =
      movementSections({
        hoursActiveLastWeek: 0,
        generalImpacts: [],
        walking: 0,
        lifting: 0,
        sitting: 0,
        standing: 0,
        reflection:
          'Saved movement reflection',
      });

    assert.equal(
      movement[0].items[0]
        .value,
      '0 hours per day last week',
    );

    assert.match(
      movement[0].items[2]
        .value,
      /does not prevent/,
    );

    assert.equal(
      movement[0].items.at(
        -1,
      )!.value,
      'Saved movement reflection',
    );

    const care =
      personalCareSections({
        generalActivityImpacts:
          [],
        personalCare:
          'normal',
        sleep:
          'neverDisturbed',
        reflection:
          'Saved care reflection',
      });

    assert.notEqual(
      care[0].items[1]
        .value,
      'Not recorded',
    );

    assert.equal(
      care[0].items.at(
        -1,
      )!.value,
      'Saved care reflection',
    );
  },
);

test(
  'social health and management summaries preserve recorded values without fixture data',
  () => {
    const social =
      socialHealthSections({
        socialLife: 0,
        travelling: 0,
        moodImpact: 0,
        relationshipImpact: 0,
        enjoymentImpact: 0,
        generalMood:
          'calm',
        reflection:
          'Saved social reflection',
      });

    assert.equal(
      social[0].items[2]
        .value,
      'Pain does not impact my mood at all.',
    );

    assert.equal(
      social[0].items.at(
        -1,
      )!.value,
      'Saved social reflection',
    );

    const management =
      managementSections({
        medications: [
          'prescription-1',
        ],

        medicationNames: [
          'Example 5 mg',
        ],

        otcMedication: '',

        exerciseFrequency:
          '0-days',

        emotionStrategy:
          'Saved strategy',
      });

    assert.equal(
      management[0].items[0]
        .value,
      'You recorded Example 5 mg.',
    );

    assert.match(
      management[0].items[1]
        .value,
      /did not exercise/,
    );

    assert.equal(
      management[0].items[2]
        .value,
      'You recorded: Saved strategy',
    );
  },
);
