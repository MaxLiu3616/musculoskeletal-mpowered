import {
  generalMoodOptions,
  socialLifeOptions,
  travellingOptions,
} from '@/features/social-health-assessment/definitions/SocialHealthAssessment.data';
import type {
  GeneralMoodId,
  SocialHealthAssessmentResponses,
  SocialHealthImpactScore,
  SocialHealthStatementScore,
} from '@/features/social-health-assessment/types/SocialHealthAssessment';

export type SocialHealthImpactLevel =
  | 'minimal'
  | 'mild'
  | 'moderate'
  | 'significant';

export function getSocialHealthTotalScore(
  responses: SocialHealthAssessmentResponses,
) {
  return (
    (responses.socialLife ?? 0) +
    (responses.travelling ?? 0) +
    (responses.moodImpact ?? 0) +
    (responses.relationshipImpact ?? 0) +
    (responses.enjoymentImpact ?? 0)
  );
}

export function getSocialHealthImpactLevel(
  totalScore: number,
): SocialHealthImpactLevel {
  if (totalScore <= 10) {
    return 'minimal';
  }

  if (totalScore <= 19) {
    return 'mild';
  }

  if (totalScore <= 30) {
    return 'moderate';
  }

  return 'significant';
}

export function getSocialHealthSummaryMessage(
  level: SocialHealthImpactLevel,
) {
  switch (level) {
    case 'minimal':
      return 'Your answers indicate that pain does not really impact your social health.';

    case 'mild':
      return 'Your answers indicate that pain mildly impacts your social health.';

    case 'moderate':
      return 'Your answers indicate that pain moderately impacts your social health.';

    case 'significant':
      return 'Your answers indicate that pain significantly impacts your social health.';
  }
}

export function findSocialLifeLabel(
  score: SocialHealthStatementScore,
) {
  return (
    socialLifeOptions.find(
      (option) => option.score === score,
    )?.label ?? ''
  );
}

export function findTravellingLabel(
  score: SocialHealthStatementScore,
) {
  return (
    travellingOptions.find(
      (option) => option.score === score,
    )?.label ?? ''
  );
}

export function findGeneralMoodLabel(
  moodId: GeneralMoodId,
) {
  return (
    generalMoodOptions.find(
      (option) => option.id === moodId,
    )?.label ?? ''
  );
}

export function getMoodSummaryText(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not impact my mood at all.';
  }

  if (score <= 3) {
    return 'Pain slightly affects my mood.';
  }

  if (score <= 6) {
    return 'Pain moderately affects my mood.';
  }

  if (score <= 8) {
    return 'Pain affects my mood a lot.';
  }

  if (score === 9) {
    return 'Pain extremely affects my mood.';
  }

  return 'Pain completely impacts my mood.';
}

export function getRelationshipSummaryText(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not interfere with my relationships.';
  }

  if (score <= 3) {
    return 'Pain slightly interferes with my relationships.';
  }

  if (score <= 6) {
    return 'Pain moderately interferes with my relationships.';
  }

  if (score <= 8) {
    return 'Pain significantly interferes with my relationships.';
  }

  if (score === 9) {
    return 'Pain extremely interferes with my relationships.';
  }

  return 'Pain completely interferes with my relationships.';
}

export function getEnjoymentSummaryText(
  score: SocialHealthImpactScore,
) {
  if (score === 0) {
    return 'Pain does not impact my ability to enjoy life.';
  }

  if (score <= 3) {
    return 'Pain slightly impacts my ability to enjoy life.';
  }

  if (score <= 6) {
    return 'Pain moderately impacts my ability to enjoy life.';
  }

  if (score <= 8) {
    return 'Pain significantly impacts my ability to enjoy life.';
  }

  if (score === 9) {
    return 'Pain extremely impacts my ability to enjoy life.';
  }

  return 'Pain completely prevents me from enjoying life.';
}