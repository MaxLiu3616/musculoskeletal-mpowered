# MPOWERED

An Expo TypeScript application for Android, iPhone, iPad, and web.

## Run the application

Use Node.js 24 (24.3 or newer) and npm. Run these commands from the repository root, where `package.json` is located.

1. Install the dependencies from the lockfile:

   ```bash
   npm ci
   ```

2. Create a `.env` file in the repository root:

   ```dotenv
   EXPO_PUBLIC_SUPABASE_URL=https://cbdzevndaxilviboorkf.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-project-publishable-key
   ```

   Replace `your-project-publishable-key` with the publishable key from the [MPOWERED Supabase project](https://supabase.com/dashboard/project/cbdzevndaxilviboorkf). Despite the variable's `ANON_KEY` name, it accepts the project's `sb_publishable_...` key. The `.env` file is ignored by Git and is not supplied by cloning the repository. Using this hosted project does not require a local Supabase server or Docker.

3. Start the web app:

   ```bash
   npm run web
   ```

   Open the local URL printed by Expo. To choose a port explicitly, use `npm run web -- --port 8082` and open `http://localhost:8082`.

   Alternatively, start Expo's platform selector:

   ```bash
   npm start
   ```

Press `w` for web, `i` for the iOS Simulator, or `a` for the Android Emulator. You can also scan the QR code with a compatible development client.

The iOS Simulator requires macOS and Xcode; the Android Emulator requires Android Studio and a configured virtual device. Direct commands are `npm run ios` and `npm run android`. Stop the development server with `Ctrl+C`.

Routes live in `src/app`, while screen content lives in `src/features`.

## Test sign-in details

The following test phone numbers and fixed verification codes are configured in the hosted MPOWERED Supabase project. They work with the deployed website and local builds connected to that project; no SMS inbox is required.

| Phone number to enter | International format | Verification code |
| --------------------- | -------------------- | ----------------- |
| `0400000000`          | `+61400000000`       | `1234`            |
| `0400000001`          | `+61400000001`       | `5678`            |
| `0400000002`          | `+61400000002`       | `8765`            |

1. On the welcome screen, select **Sign in** for an existing test account.
2. Enter a phone number from the table and select **Continue**.
3. Enter its matching four-digit code and select **Verify**.

## iPad

Run `npm start`, press `Shift+i`, and select an iPad simulator. The existing Expo app supports both iPhone and iPad; no separate app or dependencies are needed.

Layouts adapt to the current window width. At 768 points, Home and the welcome screen use tablet spacing, and assessments use the full page scroll area. At 1024 points, the main sections use a sidebar and Home uses two columns. Smaller windows keep bottom navigation. Forms and summaries are capped at 760 points for readability.

## GitHub Pages

The web app is hosted at https://maxliu3616.github.io/musculoskeletal-mpowered/
