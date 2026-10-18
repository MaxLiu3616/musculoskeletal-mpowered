import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  createSupportPerson,
  deleteSupportPerson,
  loadSupportPeople,
  updateSupportPerson as updateSupportPersonInDatabase,
  type SupportPerson,
} from '@/services/supportPeople';

import { supabase } from '@/services/supabase';

import {
  defaultUserSettings,
  loadUserSettings,
  updateUserSettings,
} from '@/services/userSettings';

export type {
  SupportPerson,
} from '@/services/supportPeople';

export type NotificationPreferences = {
  weeklyReminders: boolean;
  appointmentReminders: boolean;
};

export type DisplayPreferences = {
  textSize:
    | 'small'
    | 'medium'
    | 'large';
};

type SettingContextValue = {
  phone: string;

  setPhone: (
    phone: string,
  ) => void;

  password: string;

  hasPassword: boolean;

  setPassword: (
    password: string,
  ) => void;

  notifications:
    NotificationPreferences;

  updateNotifications: (
    changes:
      Partial<NotificationPreferences>,
  ) => void;

  display:
    DisplayPreferences;

  updateDisplay: (
    changes:
      Partial<DisplayPreferences>,
  ) => void;

  supportPeople:
    SupportPerson[];

  addSupportPerson: (
    person:
      Omit<
        SupportPerson,
        'id'
      >,
  ) => void;

  updateSupportPerson: (
    id: string,
    changes:
      Partial<SupportPerson>,
  ) => void;

  removeSupportPerson: (
    id: string,
  ) => void;

  reset: () => void;
};

const SettingContext =
  createContext<SettingContextValue | null>(
    null,
  );

type SettingProviderProps = {
  children: ReactNode;
};

const textSizeStorageKey =
  '@mpowered:text-size';

export function SettingProvider({
  children,
}: SettingProviderProps) {
  const [
    phone,
    setPhone,
  ] = useState('');

  const [
    password,
    setPasswordState,
  ] = useState('');

  const [
    notifications,
    setNotifications,
  ] =
    useState<NotificationPreferences>({
      weeklyReminders:
        defaultUserSettings.weeklyReminders,

      appointmentReminders:
        defaultUserSettings.appointmentReminders,
    });

  const [
    display,
    setDisplay,
  ] =
    useState<DisplayPreferences>({
      textSize:
        defaultUserSettings.textSize,
    });

  const [
    supportPeople,
    setSupportPeople,
  ] =
    useState<SupportPerson[]>([]);

  const notificationChanged =
    useRef(false);

  const displayChanged =
    useRef(false);

  const supportPeopleChanged =
    useRef(false);

  const displayLoadedFromServer =
    useRef(false);

  const activeUserId =
    useRef<string | null>(
      null,
    );

  useEffect(() => {
    let active = true;

    AsyncStorage
      .getItem(
        textSizeStorageKey,
      )
      .then(
        (textSize) => {
          if (
            active &&
            !displayChanged.current &&
            !displayLoadedFromServer.current &&
            (
              textSize ===
                'small' ||
              textSize ===
                'medium' ||
              textSize ===
                'large'
            )
          ) {
            setDisplay({
              textSize,
            });
          }
        },
      )
      .catch(
        (error) =>
          console.warn(
            'Could not load text size',
            error,
          ),
      );

    return () => {
      active = false;
    };
  }, []);

  const restoreSettings =
    useCallback(
      async (
        userId: string,
      ) => {
        try {
          const [
            settings,
            storedSupportPeople,
          ] =
            await Promise.all([
              loadUserSettings(),
              loadSupportPeople(),
            ]);

          if (
            activeUserId.current !==
            userId
          ) {
            return;
          }

          if (
            !notificationChanged.current
          ) {
            setNotifications({
              weeklyReminders:
                settings.weeklyReminders,

              appointmentReminders:
                settings.appointmentReminders,
            });
          }

          displayLoadedFromServer.current =
            true;

          if (
            !displayChanged.current
          ) {
            setDisplay({
              textSize:
                settings.textSize,
            });
          }

          if (
            !supportPeopleChanged.current
          ) {
            setSupportPeople(
              storedSupportPeople,
            );
          }

          await AsyncStorage.setItem(
            textSizeStorageKey,
            settings.textSize,
          );
        } catch (error) {
          console.error(
            'Failed to load user settings:',
            error,
          );
        }
      },
      [],
    );

  useEffect(() => {
    const { data } =
      supabase.auth.onAuthStateChange(
        (
          event,
          session,
        ) => {
          const user =
            session?.user;

          activeUserId.current =
            user?.id ?? null;

          const userPhone =
            user?.phone;

          setPhone(
            userPhone
              ? userPhone.startsWith(
                  '+',
                )
                ? userPhone
                : `+${userPhone}`
              : '',
          );

          if (!session) {
            notificationChanged.current =
              false;

            displayChanged.current =
              false;

            supportPeopleChanged.current =
              false;

            displayLoadedFromServer.current =
              false;

            setNotifications({
              weeklyReminders:
                defaultUserSettings.weeklyReminders,

              appointmentReminders:
                defaultUserSettings.appointmentReminders,
            });

            setSupportPeople([]);

            return;
          }

          if (
            event ===
              'INITIAL_SESSION' ||
            event ===
              'SIGNED_IN'
          ) {
            notificationChanged.current =
              false;

            displayChanged.current =
              false;

            supportPeopleChanged.current =
              false;

            displayLoadedFromServer.current =
              false;

            const userId =
              session.user.id;

            setTimeout(
              () => {
                void restoreSettings(
                  userId,
                );
              },
              0,
            );
          }
        },
      );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [
    restoreSettings,
  ]);

  const setPassword = (
    value: string,
  ) => {
    setPasswordState(
      value,
    );
  };

  const updateNotifications = (
    changes:
      Partial<NotificationPreferences>,
  ) => {
    notificationChanged.current =
      true;

    setNotifications(
      (current) => ({
        ...current,
        ...changes,
      }),
    );

    void updateUserSettings(
      changes,
    ).catch(
      (error) => {
        console.error(
          'Failed to save notification settings:',
          error,
        );
      },
    );
  };

  const updateDisplay = (
    changes:
      Partial<DisplayPreferences>,
  ) => {
    displayChanged.current =
      true;

    setDisplay(
      (current) => ({
        ...current,
        ...changes,
      }),
    );

    if (
      changes.textSize
    ) {
      void AsyncStorage.setItem(
        textSizeStorageKey,
        changes.textSize,
      ).catch(
        (error) =>
          console.warn(
            'Could not save text size',
            error,
          ),
      );
    }

    void updateUserSettings(
      changes,
    ).catch(
      (error) => {
        console.error(
          'Failed to save display settings:',
          error,
        );
      },
    );
  };

  const addSupportPerson = (
    person:
      Omit<
        SupportPerson,
        'id'
      >,
  ) => {
    supportPeopleChanged.current =
      true;

    const requestUserId =
      activeUserId.current;

    if (!requestUserId) {
      return;
    }

    void createSupportPerson(
      person,
    )
      .then(
        (created) => {
          if (
            activeUserId.current !==
            requestUserId
          ) {
            return;
          }

          setSupportPeople(
            (current) => [
              ...current,
              created,
            ],
          );
        },
      )
      .catch(
        (error) => {
          console.error(
            'Failed to add support person:',
            error,
          );
        },
      );
  };

  const updateSupportPerson = (
    id: string,
    changes:
      Partial<SupportPerson>,
  ) => {
    const existing =
      supportPeople.find(
        (person) =>
          person.id === id,
      );

    if (!existing) {
      return;
    }

    supportPeopleChanged.current =
      true;

    const requestUserId =
      activeUserId.current;

    if (!requestUserId) {
      return;
    }

    const input = {
      name:
        changes.name ??
        existing.name,

      phone:
        changes.phone ??
        existing.phone,

      email:
        changes.email ??
        existing.email,

      canAddQuestions:
        changes.canAddQuestions ??
        existing.canAddQuestions,

      canViewAnswers:
        changes.canViewAnswers ??
        existing.canViewAnswers,
    };

    void updateSupportPersonInDatabase(
      id,
      input,
    )
      .then(
        (updated) => {
          if (
            activeUserId.current !==
            requestUserId
          ) {
            return;
          }

          setSupportPeople(
            (current) =>
              current.map(
                (person) =>
                  person.id === id
                    ? updated
                    : person,
              ),
          );
        },
      )
      .catch(
        (error) => {
          console.error(
            'Failed to update support person:',
            error,
          );
        },
      );
  };

  const removeSupportPerson = (
    id: string,
  ) => {
    supportPeopleChanged.current =
      true;

    const requestUserId =
      activeUserId.current;

    if (!requestUserId) {
      return;
    }

    void deleteSupportPerson(
      id,
    )
      .then(
        () => {
          if (
            activeUserId.current !==
            requestUserId
          ) {
            return;
          }

          setSupportPeople(
            (current) =>
              current.filter(
                (person) =>
                  person.id !== id,
              ),
          );
        },
      )
      .catch(
        (error) => {
          console.error(
            'Failed to remove support person:',
            error,
          );
        },
      );
  };

  const reset = () => {
    setPhone('');

    setPasswordState('');

    setNotifications({
      weeklyReminders:
        defaultUserSettings.weeklyReminders,

      appointmentReminders:
        defaultUserSettings.appointmentReminders,
    });

    setSupportPeople([]);

    notificationChanged.current =
      false;

    displayChanged.current =
      false;

    supportPeopleChanged.current =
      false;

    displayLoadedFromServer.current =
      false;

    activeUserId.current =
      null;
  };

  return (
    <SettingContext.Provider
      value={{
        phone,
        setPhone,

        password,

        hasPassword:
          password.length > 0,

        setPassword,

        notifications,
        updateNotifications,

        display,
        updateDisplay,

        supportPeople,
        addSupportPerson,
        updateSupportPerson,
        removeSupportPerson,

        reset,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const context =
    useContext(
      SettingContext,
    );

  if (!context) {
    throw new Error(
      'useSetting must be used inside SettingProvider',
    );
  }

  return context;
}