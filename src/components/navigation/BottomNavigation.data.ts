export const bottomNavigationItems = [
  {
    id: 'pain-tracker',
    label: 'Pain Tracker',
    icon: 'accessibility',
    href: '/home',
  },
  {
    id: 'my-health',
    label: 'My Health',
    icon: 'folder',
    href: '/my-health',
  },
  {
    id: 'care-planner',
    label: 'Care Planner',
    icon: 'clipboard',
    href: '/care-planner',
  },
  {
    id: 'setting',
    label: 'Setting',
    icon: 'settings',
    href: '/setting',
  },
] as const;

export type BottomNavigationId =
  (typeof bottomNavigationItems)[number]['id'];

export function getActiveBottomNavigationItem(pathname: string): BottomNavigationId | null {
  const section = pathname.split('/')[1];

  switch (section) {
    case '':
    case 'onboarding':
      return null;
    case 'my-health':
    case 'care-planner':
    case 'setting':
      return section;
    default:
      return 'pain-tracker';
  }
}
