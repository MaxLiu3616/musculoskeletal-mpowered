# MPOWERED iPad verification — 4 October 2026

Implemented in the existing Expo app on `design-idea`. The existing `ios.supportsTablet: true` and unlocked orientation configuration are retained. No dependencies, routes, context data, or persistence mechanisms were added.

## Changes

- Removed the root 390 × 844 web frame and the screen-specific phone-width limits.
- Added a 216-point sidebar for windows at least 1024 points wide; narrower windows retain the existing animated bottom navigation.
- Added tablet spacing at 768 points, two-column Home at 1024 points, larger assessment cards, and a two-column welcome screen.
- Centered forms, headers, and all five assessment summaries within a 760-point maximum width.
- Let tablet option lists scroll with the assessment page while preserving bounded lists in compact windows.
- Replaced unsupported native interpolation easing with sampled ranges. Reduced-motion behavior remains intact.
- Kept focused iOS form inputs above the keyboard and measured footer when showing the keyboard or rotating.

## Verification

| Check | Result |
| --- | --- |
| TypeScript (`npx tsc --noEmit`) | Passed |
| Existing Node tests, using local TypeScript transpilation and the `@/` path mapping | 24 passed |
| Expo web, iOS, and Android bundle exports | Passed; artifacts in `../output/ipad-20261004/export` |
| `git diff --check` | Passed |
| Native iPad Pro 11-inch (M5), iOS 26.5, Expo Go SDK 57 | Rendered in portrait and landscape |
| Native Pain assessment | Selection survives rotation; Continue and Back preserve the recorded answer |
| Native Reflection | Text survives rotation, input and Save remain reachable with the software keyboard, Save and reopen preserve the text |
| Browser main sections and all five assessment entry routes | Passed |
| Browser Management assessment | Required exercise selection respected; summary saved; Home advances to 1 of 5 complete |
| Welcome and onboarding | Both tablet orientations rendered; Get started reaches Your name; main navigation stays hidden |
| Large text and reduced motion | Passed at the eight window sizes below |

Browser window checks: 1194 × 834, 1024 × 768, 834 × 1194, 768 × 1024, 744 × 1133, 600 × 900, 390 × 844, and 320 × 740. The document had no horizontal overflow, cards stayed within the window, and navigation stayed visible. Window checks waited for React Native's resized layout before measuring.

## Visual evidence

- [Home landscape](../output/playwright/ipad-home-landscape.png)
- [Home portrait](../output/playwright/ipad-home-portrait.png)
- [Native iPad landscape](../output/playwright/ipad-native-home-landscape.png)
- [Native keyboard in portrait](../output/playwright/ipad-native-keyboard-portrait.png)
- [1024-point landscape with Large text](../output/playwright/ipad-large-1024.png)
- [320-point phone with Large text](../output/playwright/ipad-large-320.png)
- [My Health](../output/playwright/ipad-my-health.png)
- [Care Planner](../output/playwright/ipad-care-planner.png)
- [Settings](../output/playwright/ipad-settings.png)
- [Management summary with Large text](../output/playwright/ipad-management-summary.png)
- [Welcome landscape](../output/playwright/ipad-welcome-landscape.png)
- [Welcome portrait](../output/playwright/ipad-welcome-portrait.png)

## Boundaries

Native checks used the iPad Simulator through Expo Go. This is not a signed standalone IPA or a physical-iPad installation. Narrow-window behavior was checked in browser viewports; native Stage Manager, Split View, VoiceOver, and physical-device testing were not performed. Android received a bundle export, not device UI testing.

Synthetic assessment and reflection values were entered only in the isolated `127.0.0.1` browser origin and the new iPad simulator session, then cleared by reloading. Medium text was restored in that browser origin. The seven files with pre-existing changes, including logout/context work and `design-qa.md`, were preserved. Changes remain uncommitted.

The repository-required [Expo SDK 57 documentation](https://docs.expo.dev/versions/v57.0.0/), [app configuration reference](https://docs.expo.dev/versions/v57.0.0/config/app/), and [React Native window-dimensions reference](https://reactnative.dev/docs/usewindowdimensions) were consulted. Native keyboard and animation behavior was also checked against the installed React Native source.
