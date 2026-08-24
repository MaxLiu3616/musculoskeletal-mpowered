export const loadingBridgeSlides = [
  {
    id: 'start',
    image: require('../../../../assets/images/loading-paper-plane.png'),
    imageLabel: 'Paper plane taking off',
    message: "You're off to an MPowered start!",
  },
  {
    id: 'questionnaires',
    image: require('../../../../assets/images/loading-checklist.png'),
    imageLabel: 'Completed questionnaire checklist',
    message:
      "Next, you'll complete short questionnaires about how your pain is impacting you.",
  },
  {
    id: 'doctor-questions',
    image: require('../../../../assets/images/loading-question-lightbulb.png'),
    imageLabel: 'Question inside a lightbulb',
    message:
      'Based on your answers, this app suggests questions you can ask your doctor.',
  },
] as const;

export const loadingBridgeCopy = {
  continueLabel: 'Continue',
  nextStepMessage: 'The homescreen will connect here.',
} as const;

export const loadingBridgeSlideDuration = 1800;
