import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useEffect } from 'react';

import { Linking } from 'react-native';

import { useCarePlanner } from '@/features/care-planner/CarePlannerContext';
import { useHomeAssessment } from '@/features/home/HomeAssessmentContext';
import HomeScreen from '@/features/home/components/HomeScreen';

import type {
  HomeSummaryItem,
  HomeSummaryType,
} from '@/features/home/components/HomeSummaryCard.data';

import type {
  HomeAssessmentId,
} from '@/features/home/components/HomeScreen.data';

import { buildPainInsight } from '@/features/insights/InsightCard.data';
import { useMyHealth } from '@/features/my-health/MyHealthContext';
import { useOnboarding } from '@/features/onboarding/OnboardingContext';

const painGuideUrl =
  'https://muscha.org/pain-guide/';

const MONTH_INDEX: Record<
  string,
  number
> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sept: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseAssessmentDateLabel(
  dateLabel?: string,
) {
  if (!dateLabel) {
    return 0;
  }

  const [
    dayText,
    monthText,
    yearText,
  ] = dateLabel.split(' ');

  const day =
    Number(dayText);

  const month =
    MONTH_INDEX[monthText];

  const year =
    Number(yearText);

  if (
    Number.isNaN(day) ||
    month === undefined ||
    Number.isNaN(year)
  ) {
    return 0;
  }

  return new Date(
    year,
    month,
    day,
  ).getTime();
}

export default function HomeRoute() {
  const { name: routeNameParam } =
    useLocalSearchParams<{
      name?: string | string[];
    }>();

  const {
    name: onboardingName,
    setName,
  } = useOnboarding();

  const {
    assessmentStatus,
  } = useHomeAssessment();

  const {
    startPlan,
  } = useCarePlanner();

  const {
    records,
  } = useMyHealth();

  const routeName =
    Array.isArray(
      routeNameParam,
    )
      ? routeNameParam[0]
      : (
          routeNameParam ??
          ''
        );

  const userName =
    routeName ||
    onboardingName;

  useEffect(() => {
    if (routeName) {
      setName(routeName);
    }
  }, [routeName, setName]);

  const allAssessmentsCompleted =
    Object.values(
      assessmentStatus,
    ).every(
      (status) =>
        status.completed,
    );

  const latestAssessmentUpdate =
    Object.values(
      assessmentStatus,
    )
      .filter(
        (status) =>
          status.completed &&
          status.updatedAt,
      )
      .sort(
        (a, b) =>
          parseAssessmentDateLabel(
            b.updatedAt,
          ) -
          parseAssessmentDateLabel(
            a.updatedAt,
          ),
      )[0]?.updatedAt;

  const summaryItems:
    HomeSummaryItem[] =
    allAssessmentsCompleted
      ? [
          {
            type:
              'health-profile',
            updatedAt:
              latestAssessmentUpdate,
          },
          {
            type:
              'personalised-questions',
            updatedAt:
              latestAssessmentUpdate,
          },
        ]
      : [];

  const painInsight =
    buildPainInsight(
      records,
    );

  const openAssessment = (
    assessmentId:
      HomeAssessmentId,
  ) => {
    if (userName) {
      setName(userName);
    }

    switch (
      assessmentId
    ) {
      case 'pain':
        router.push(
          '/assessment/pain',
        );
        break;

      case 'movement':
        router.push(
          '/assessment/movement',
        );
        break;

      case 'personal-care':
        router.push(
          '/assessment/personal-care',
        );
        break;

      case 'social-health':
        router.push(
          '/assessment/social-health',
        );
        break;

      case 'management':
        router.push(
          '/assessment/management',
        );
        break;
    }
  };

  const openReflection =
    () => {
      router.push(
        '/reflection',
      );
    };

  const openSummary = (
    type:
      HomeSummaryType,
  ) => {
    if (userName) {
      setName(userName);
    }

    switch (type) {
      case 'health-profile':
        router.push({
          pathname:
            '/my-health/profile',

          params: {
            from: 'home',
          },
        });

        break;

      case 'personalised-questions':
        startPlan(
          records,
        );

        router.push({
          pathname:
            '/care-planner/appointment',

          params: {
            from: 'home',
          },
        });

        break;
    }
  };

  const openPainHistory =
    () => {
      router.push({
        pathname:
          '/my-health/tracking',

        params: {
          tab: 'history',
          from: 'home',
        },
      });
    };

  const openAppointment =
    () => {
      startPlan(
        records,
      );

      router.push({
        pathname:
          '/care-planner/appointment',

        params: {
          from: 'home',
        },
      });
    };

  const openPainGuide =
    () => {
      void Linking.openURL(
        painGuideUrl,
      );
    };

  return (
    <HomeScreen
      assessmentStatus={
        assessmentStatus
      }
      summaryItems={
        summaryItems
      }
      painInsight={
        painInsight
      }
      onAssessmentPress={
        openAssessment
      }
      onSummaryPress={
        openSummary
      }
      onReflectionPress={
        openReflection
      }
      onCheckPainHistory={
        openPainHistory
      }
      onPlanAppointment={
        openAppointment
      }
      onCheckPainGuide={
        openPainGuide
      }
      userName={
        userName
      }
    />
  );
}
