export const loadingBridgeSlides = [
  {
    id: 'start',
    icon: 'paper-plane-outline',
    message: "You're off to an MPowered start!",
  },
  {
    id: 'questionnaires',
    icon: 'checkbox-outline',
    message:
      "Next, you'll complete short questionnaires about how your pain is impacting you.",
  },
  {
    id: 'doctor-questions',
    icon: 'chatbubbles-outline',
    message:
      'Based on your answers, this app suggests questions you can ask your doctor.',
  },
] as const;

export const loadingBridgeCopy = {
  continueLabel: 'Continue',
} as const;

export const loadingBridgeSlideDuration = 1800;
