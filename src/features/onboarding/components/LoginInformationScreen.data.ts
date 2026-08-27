export const loginInformationIntroCopy = {
  thankYouPrefix: 'Thank you',
  thankYouEmoji: '😃',
  message:
    "Finally, let's link this information to your account so the next time you open this app, you can just log in",
  continueLabel: 'Continue',
} as const;

export const phoneNumberScreenCopy = {
  title: 'Your phone number',
  inputLabel: 'Phone number',
  helper: 'We will send the four digit verification code to this number',
  continueLabel: 'Continue',
} as const;

export const verificationCodeScreenCopy = {
  title: "We're sending the verification code to this number",
  inputLabel: 'Four digit verification code',
  resendLabel: 'Resend the verification code',
  resendHelperPrefix: 'You can resend the code in',
  resendAvailable: 'You can resend the code now',
  verifyLabel: 'Verify',
} as const;

export const verificationResendSeconds = 120;
