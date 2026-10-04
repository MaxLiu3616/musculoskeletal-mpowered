import type { ReactNode } from 'react';
import AssessmentScreen from '@/components/AssessmentScreen';

type Props = {
  children: ReactNode;
  sectionTitle: string;
  step: number;
  canRecord: boolean;
  compactCard?: boolean;
  onBack: () => void;
  onRecord: () => void;
};

export default function PainAssessmentScreen(props: Props) {
  return <AssessmentScreen {...props} title="Pain" totalSteps={6} />;
}
