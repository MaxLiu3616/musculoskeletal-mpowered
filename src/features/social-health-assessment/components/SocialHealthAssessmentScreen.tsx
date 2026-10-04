import type { ReactNode } from 'react';
import AssessmentScreen from '@/components/AssessmentScreen';

type Props = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  totalSteps: number;
  canRecord: boolean;
  compactCard?: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function SocialHealthAssessmentScreen(props: Props) {
  return <AssessmentScreen {...props} title="Social health" />;
}
