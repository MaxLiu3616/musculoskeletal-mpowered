import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from 'react';

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
};

const SettingContext = createContext<SettingContextValue | null>(null);

type SettingProviderProps = {
    children: ReactNode;
};

let nextSupportPersonId = 1;

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

    const setPassword = (value: string) => {
        setPasswordState(value);
    };

    const updateNotifications = (changes: Partial<NotificationPreferences>) => {
        setNotifications((current) => ({ ...current, ...changes }));
    };

    const updateDisplay = (changes: Partial<DisplayPreferences>) => {
        setDisplay((current) => ({ ...current, ...changes }));
    };

    const addSupportPerson = (person: Omit<SupportPerson, 'id'>) => {
        const id = String(nextSupportPersonId);
        nextSupportPersonId += 1;
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