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

  supportPeopleLoading: boolean;
  supportPeopleAccountId: string | null;
  supportPeopleError: string;
  supportPeopleSaving: boolean;
  reloadSupportPeople: () => Promise<void>;

  addSupportPerson: (
    person:
      Omit<
        SupportPerson,
        'id'
      >,
  ) => Promise<void>;

  updateSupportPerson: (
    id: string,
    changes:
      Partial<SupportPerson>,
  ) => Promise<void>;

  removeSupportPerson: (
    id: string,
  ) => Promise<void>;

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

  const [supportPeopleLoading, setSupportPeopleLoading] = useState(true);
  const [supportPeopleAccountId, setSupportPeopleAccountId] = useState<string | null>(null);
  const [supportPeopleError, setSupportPeopleError] = useState('');
  const [supportPeopleSaving, setSupportPeopleSaving] = useState(false);
  const supportRequest = useRef(0);
  const supportSession = useRef(0);
  const supportWritePending = useRef(false);

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
          const settings = await loadUserSettings();

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

  const reloadSupportPeople = useCallback(async () => {
    const userId = activeUserId.current;
    if (supportWritePending.current) return;
    const request = ++supportRequest.current;
    setSupportPeopleError('');
    if (!userId) {
      setSupportPeople([]);
      setSupportPeopleLoading(false);
      setSupportPeopleError('Sign in to save and manage support people.');
      return;
    }
    setSupportPeopleLoading(true);
    try {
      const people = await loadSupportPeople(userId);
      if (request === supportRequest.current) setSupportPeople(people);
    } catch {
      if (request === supportRequest.current) {
        setSupportPeopleError('Could not load support people. Check your connection and try again.');
      }
    } finally {
      if (request === supportRequest.current) setSupportPeopleLoading(false);
    }
  }, []);

  useEffect(() => {
    const { data } =
      supabase.auth.onAuthStateChange(
        (
          event,
          session,
        ) => {
          const user =
            session?.user;

          const nextUserId = user?.id ?? null;
          if (activeUserId.current !== nextUserId) {
            supportSession.current += 1;
            supportRequest.current += 1;
            supportWritePending.current = false;
            setSupportPeople([]);
            setSupportPeopleError('');
            setSupportPeopleSaving(false);
            setSupportPeopleLoading(!!nextUserId);
          }
          activeUserId.current = nextUserId;
          setSupportPeopleAccountId(nextUserId);

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

            displayLoadedFromServer.current =
              false;

            setNotifications({
              weeklyReminders:
                defaultUserSettings.weeklyReminders,

              appointmentReminders:
                defaultUserSettings.appointmentReminders,
            });

            supportRequest.current += 1;
            setSupportPeople([]);
            setSupportPeopleLoading(false);
            setSupportPeopleError('Sign in to save and manage support people.');

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

            displayLoadedFromServer.current =
              false;

            const userId =
              session.user.id;

            setTimeout(
              () => {
                if (activeUserId.current !== userId) return;
                void restoreSettings(userId);
                void reloadSupportPeople();
              },
              0,
            );
          }
        },
      );

    return () => {
      data.subscription.unsubscribe();
      supportRequest.current += 1;
      supportSession.current += 1;
    };
  }, [
    restoreSettings,
    reloadSupportPeople,
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

  const renderedSupportSession = supportSession.current;
  const mutateSupportPeople = async <T,>(
    write: (userId: string) => Promise<T>,
    apply: (result: T, people: SupportPerson[]) => SupportPerson[],
  ) => {
    const userId = supportPeopleAccountId;
    if (!userId || userId !== activeUserId.current || renderedSupportSession !== supportSession.current) {
      throw new Error('Your account has changed. Reopen support people to continue.');
    }
    if (supportWritePending.current) throw new Error('Wait for the current change to finish.');
    const session = supportSession.current;
    supportWritePending.current = true;
    supportRequest.current += 1;
    setSupportPeopleLoading(false);
    setSupportPeopleSaving(true);
    try {
      const result = await write(userId);
      if (session !== supportSession.current) {
        throw new Error('Your account has changed. Reopen support people to continue.');
      }
      setSupportPeople((current) => apply(result, current));
      setSupportPeopleError('');
    } finally {
      if (session === supportSession.current) {
        supportWritePending.current = false;
        setSupportPeopleSaving(false);
      }
    }
  };

  const addSupportPerson = (person: Omit<SupportPerson, 'id'>) =>
    mutateSupportPeople(
      (userId) => createSupportPerson(person, userId),
      (created, current) => [...current, created],
    );

  const updateSupportPerson = async (id: string, changes: Partial<SupportPerson>) => {
    const existing = supportPeople.find((person) => person.id === id);
    if (!existing) throw new Error('This support person is no longer available. Refresh the list.');
    await mutateSupportPeople(
      (userId) => updateSupportPersonInDatabase(id, { ...existing, ...changes }, userId),
      (updated, current) => current.map((person) => person.id === id ? updated : person),
    );
  };

  const removeSupportPerson = (id: string) =>
    mutateSupportPeople(
      (userId) => deleteSupportPerson(id, userId),
      (_, current) => current.filter((person) => person.id !== id),
    );

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

    supportRequest.current += 1;
    supportSession.current += 1;
    supportWritePending.current = false;
    setSupportPeopleLoading(false);
    setSupportPeopleSaving(false);
    setSupportPeopleError('');
    setSupportPeopleAccountId(null);

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
        supportPeopleLoading,
        supportPeopleAccountId,
        supportPeopleError,
        supportPeopleSaving,
        reloadSupportPeople,
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
