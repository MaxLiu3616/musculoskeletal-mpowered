import { findPainCharacteristicLabel, findPainLocationLabel, getPainSummaryDescription } from '@/features/pain-tracker/definitions/PainAssessment.data';
import type { PainAssessmentResponses } from '@/features/pain-tracker/types/PainAssessment';
import { generalMovementImpactOptions, movementImpactSections } from '@/features/movement-assessment/definitions/MovementAssessment.data';
import type { MovementAssessmentResponses, MovementImpactArea } from '@/features/movement-assessment/types/MovementAssessment';
import { findGeneralActivityLabel, findPersonalCareLabel, findSleepLabel } from '@/features/personal-care/definitions/PersonalCareAssessment.data';
import type { PersonalCareAssessmentResponses } from '@/features/personal-care/types/PersonalCareAssessment';
import { findGeneralMoodLabel, findSocialLifeLabel, findTravellingLabel, getEnjoymentSummaryText, getMoodSummaryText, getRelationshipSummaryText } from '@/features/social-health-assessment/definitions/SocialHealthSummary.data';
import type { SocialHealthAssessmentResponses } from '@/features/social-health-assessment/types/SocialHealthAssessment';
import { getEmotionResult, getExerciseResult, getMedicationResult } from '@/features/management-assessment/definitions/ManagementAssessment.data';
import type { ManagementAssessmentResponses } from '@/features/management-assessment/types/ManagementAssessment';

import type { HealthSection } from './MyHealth.types';

export function painLocations(pain: PainAssessmentResponses) {
  return pain.locations.map((id) => id === 'other'
    ? pain.otherLocation.trim()
    : findPainLocationLabel(id) ?? id).filter(Boolean);
}

export function painSections(responses: PainAssessmentResponses): HealthSection[] {
  return [{
    title: 'My Pain',
    items: [
      { label: 'Pain location', value: painLocations(responses).join(', ') },
      { label: 'Pain characteristics', value: responses.characteristics.map(findPainCharacteristicLabel).join(', ') },
      ...([
        ['currentPain', 'Current pain'], ['averagePain', 'Average pain'],
        ['worstPain', 'Worst pain'], ['mildestPain', 'Mildest pain'],
      ] as const).map(([key, label]) => ({
        label, value: responses[key] === null ? 'Not recorded' : `${responses[key]}/10. ${getPainSummaryDescription(key, responses[key])}.`,
      })),
    ],
  }];
}

export function movementSections(responses: MovementAssessmentResponses): HealthSection[] {
  const areas: MovementImpactArea[] = ['walking', 'lifting', 'sitting', 'standing'];
  return [{
    title: 'Impacts to Movement',
    items: [
      { label: 'Average activity hours', value: `${responses.hoursActiveLastWeek} hours per day last week` },
      { label: 'General movement', value: generalMovementImpactOptions.filter((item) => responses.generalImpacts.includes(item.id)).map((item) => item.label).join('. ') || 'No impacts selected.' },
      ...areas.map((area) => ({
        label: movementImpactSections[area].title,
        value: movementImpactSections[area].options.find((item) => item.score === responses[area])?.label ?? 'Not recorded',
      })),
      { label: 'Reflection', value: responses.reflection?.trim() || 'No reflection recorded.' },
    ],
  }];
}

export function personalCareSections(responses: PersonalCareAssessmentResponses): HealthSection[] {
  return [{
    title: 'Impacts to Personal Care',
    items: [
      { label: 'General activities', value: responses.generalActivityImpacts.map(findGeneralActivityLabel).join('. ') || 'No impacts selected.' },
      { label: 'Personal care (washing, dressing, etc)', value: responses.personalCare ? findPersonalCareLabel(responses.personalCare) ?? 'Not recorded' : 'Not recorded' },
      { label: 'Sleeping', value: responses.sleep ? findSleepLabel(responses.sleep) ?? 'Not recorded' : 'Not recorded' },
      { label: 'Reflection', value: responses.reflection.trim() || 'No reflection recorded.' },
    ],
  }];
}

export function socialHealthSections(responses: SocialHealthAssessmentResponses): HealthSection[] {
  return [{
    title: 'Impacts to Social Health',
    items: [
      { label: 'Social life', value: responses.socialLife === null ? 'Not recorded' : findSocialLifeLabel(responses.socialLife) },
      { label: 'Travelling', value: responses.travelling === null ? 'Not recorded' : findTravellingLabel(responses.travelling) },
      { label: 'Mood', value: responses.moodImpact === null ? 'Not recorded' : getMoodSummaryText(responses.moodImpact) },
      { label: 'Relationships', value: responses.relationshipImpact === null ? 'Not recorded' : getRelationshipSummaryText(responses.relationshipImpact) },
      { label: 'Enjoyment of life', value: responses.enjoymentImpact === null ? 'Not recorded' : getEnjoymentSummaryText(responses.enjoymentImpact) },
      { label: 'General mood', value: responses.generalMood ? findGeneralMoodLabel(responses.generalMood) : 'Not recorded' },
      { label: 'Reflection', value: responses.reflection.trim() || 'No reflection recorded.' },
    ],
  }];
}

export function managementSections(responses: ManagementAssessmentResponses): HealthSection[] {
  return [{
    title: 'My Current Management',
    items: [
      { label: 'Medication', value: getMedicationResult(responses) },
      { label: 'Exercise', value: responses.exerciseFrequency ? getExerciseResult(responses.exerciseFrequency) : 'Not recorded' },
      { label: 'Emotion', value: getEmotionResult(responses.emotionStrategy) },
    ],
  }];
}
