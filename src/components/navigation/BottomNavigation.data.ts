export const bottomNavigationItems = [
  {
    id: 'pain-tracker',
    label: 'Pain Tracker',
    icon: 'accessibility',
  },
  {
    id: 'my-health',
    label: 'My Health',
    icon: 'folder',
  },
  {
    id: 'care-planner',
    label: 'Care Planner',
    icon: 'clipboard',
  },
  {
    id: 'setting',
    label: 'Setting',
    icon: 'settings',
  },
] as const;

export type BottomNavigationId =
  (typeof bottomNavigationItems)[number]['id'];