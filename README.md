# MPOWERED

An empty Expo TypeScript application for Android, iPhone, iPad, and web.

## Run the application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npm start
   ```

Press `w` for web, `i` for the iOS Simulator, or `a` for the Android Emulator. You can also scan the QR code with a compatible development client.

Routes live in `src/app`, while screen content lives in `src/features`.

## iPad

Run `npm start`, press `Shift+i`, and select an iPad simulator. The existing Expo app supports both iPhone and iPad; no separate app or dependencies are needed.

Layouts adapt to the current window width. At 768 points, Home and the welcome screen use tablet spacing, and assessments use the full page scroll area. At 1024 points, the main sections use a sidebar and Home uses two columns. Smaller windows keep bottom navigation. Forms and summaries are capped at 760 points for readability.

Verification details and screenshots are in [ipad-qa.md](ipad-qa.md).
