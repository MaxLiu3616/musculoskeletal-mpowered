import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react';

import { supabase } from '@/services/supabase';

export type NotificationPreferences = {
    weeklyReminders: boolean;
    appointmentReminders: boolean;
};

export type DisplayPreferences = {
    textSize: 'small' | 'medium' | 'large';
};

export type SupportPerson = {
    id: string;
    name: string;
    phone: string;
    email: string;
    canAddQuestions: boolean;
    canViewAnswers: boolean;
};

type SettingContextValue = {
    phone: string;
    setPhone: (phone: string) => void;
    password: string;
    hasPassword: boolean;
    setPassword: (password: string) => void;
    notifications: NotificationPreferences;
    updateNotifications: (changes: Partial<NotificationPreferences>) => void;
    display: DisplayPreferences;
    updateDisplay: (changes: Partial<DisplayPreferences>) => void;
    supportPeople: SupportPerson[];
    addSupportPerson: (person: Omit<SupportPerson, 'id'>) => void;
    updateSupportPerson: (id: string, changes: Partial<SupportPerson>) => void;
    removeSupportPerson: (id: string) => void;
    reset: () => void;
};

const SettingContext = createContext<SettingContextValue | null>(null);

type SettingProviderProps = {
    children: ReactNode;
};

const textSizeStorageKey = '@mpowered:text-size';

export function SettingProvider({ children }: SettingProviderProps) {
    const [phone, setPhone] = useState('');
    const [password, setPasswordState] = useState('');
    const [notifications, setNotifications] = useState<NotificationPreferences>({
        weeklyReminders: true,
        appointmentReminders: true,
    });
    const [display, setDisplay] = useState<DisplayPreferences>({
        textSize: 'medium',
    });
    const [supportPeople, setSupportPeople] = useState<SupportPerson[]>([]);
    const nextSupportPersonId = useRef(1);
    const displayChanged = useRef(false);

    useEffect(() => {
        let active = true;

        AsyncStorage.getItem(textSizeStorageKey).then((textSize) => {
            if (active && !displayChanged.current &&
                (textSize === 'small' || textSize === 'medium' || textSize === 'large')) {
                setDisplay({ textSize });
            }
        }).catch((error) => console.warn('Could not load text size', error));

        return () => { active = false; };
    }, []);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            const userPhone = session?.user?.phone;
            setPhone(
                userPhone
                    ? userPhone.startsWith('+') ? userPhone : `+${userPhone}`
                    : '',
            );
        });

        return () => data.subscription.unsubscribe();
    }, []);

    const setPassword = (value: string) => {
        setPasswordState(value);
    };

    const updateNotifications = (changes: Partial<NotificationPreferences>) => {
        setNotifications((current) => ({ ...current, ...changes }));
    };

    const updateDisplay = (changes: Partial<DisplayPreferences>) => {
        displayChanged.current = true;
        setDisplay((current) => ({ ...current, ...changes }));

        if (changes.textSize) {
            AsyncStorage.setItem(textSizeStorageKey, changes.textSize)
                .catch((error) => console.warn('Could not save text size', error));
        }
    };

    const addSupportPerson = (person: Omit<SupportPerson, 'id'>) => {
        const id = String(nextSupportPersonId.current);
        nextSupportPersonId.current += 1;
        setSupportPeople((current) => [...current, { ...person, id }]);
    };

    const updateSupportPerson = (id: string, changes: Partial<SupportPerson>) => {
        setSupportPeople((current) =>
            current.map((person) =>
                person.id === id ? { ...person, ...changes } : person,
            ),
        );
    };

    const removeSupportPerson = (id: string) => {
        setSupportPeople((current) =>
            current.filter((person) => person.id !== id),
        );
    };

    const reset = () => {
        setPhone('');
        setPasswordState('');
        setNotifications({ weeklyReminders: true, appointmentReminders: true });
        setSupportPeople([]);
        nextSupportPersonId.current = 1;
    };

    return (
        <SettingContext.Provider
            value={{
                phone,
                setPhone,
                password,
                hasPassword: password.length > 0,
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
    const context = useContext(SettingContext);

    if (!context) {
        throw new Error('useSetting must be used inside SettingProvider');
    }

    return context;
}
