/// <reference types="node" />
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as jsxRuntime from 'react/jsx-runtime';
import type { CommonNavigationAction } from 'expo-router';
import { StackRouter } from 'expo-router/build/react-navigation/routers/StackRouter';
import type { StackNavigationState } from 'expo-router/build/react-navigation/routers/StackRouter';
import ts from 'typescript';

test('logout returns to the welcome screen and clears the SDK 58 navigation stack', async () => {
  const stackRouter = StackRouter({});
  const routeNames = ['index', 'home', 'setting'];
  const code = ts.transpileModule(readFileSync('src/app/setting/index.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;

  for (const previousRoutes of [['home', 'setting'], ['index', 'home', 'setting']]) {
    let state: StackNavigationState<Record<string, object | undefined>> = {
      stale: false, type: 'stack', key: 'root', routeKeySeq: previousRoutes.length,
      routeNames, index: previousRoutes.length - 1,
      routes: previousRoutes.map((name, index) => ({ name, key: `${name}-${index}` })),
    };
    const navigation = {
      getState: () => state,
      dispatch: (action: CommonNavigationAction) => {
        const result = stackRouter.getStateForAction(state, action, {
          routeNames, routeGetIdList: {},
        });
        assert.ok(typeof result === 'object' && result !== null, 'Expo Router must accept the logout reset');
        state = result.state;
      },
    };
    const context = { reset() {} };
    const module = { exports: {} as { default: () => { props: { onLogout: () => Promise<void> } } } };
    const dependencies: Record<string, unknown> = {
      'react/jsx-runtime': jsxRuntime,
      'expo-router': { router: {}, useNavigation: () => navigation },
      '@/features/setting/components/SettingScreen': { default: () => null },
      '@/features/care-planner/CarePlannerContext': { useCarePlanner: () => context },
      '@/features/home/HomeAssessmentContext': { useHomeAssessment: () => context },
      '@/features/my-health/MyHealthContext': { useMyHealth: () => context },
      '@/features/onboarding/OnboardingContext': { useOnboarding: () => context },
      '@/features/reflection/ReflectionContext': { useReflection: () => context },
      '@/features/setting/SettingContext': { useSetting: () => context },
      '@/services/supabase': { supabase: { auth: { signOut: async () => ({ error: null }) } } },
    };
    new Function('require', 'module', 'exports', code)(
      (id: string) => {
        assert.ok(id in dependencies, `Unexpected dependency: ${id}`);
        return dependencies[id];
      }, module, module.exports,
    );

    await module.exports.default().props.onLogout();
    assert.equal(state.index, 0);
    assert.equal(state.routes.length, 1);
    assert.equal(state.routes[0].name, 'index');
    assert.ok(state.routes[0].key);
  }
});
