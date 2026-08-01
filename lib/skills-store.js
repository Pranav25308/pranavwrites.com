// Skills store with localStorage persistence and defaults fallback.
// Skill shape: { id: string, name: string, icon: string, color: string }

import { SKILLS as DEFAULT_SKILLS } from '@/app/about/data';

const STORAGE_KEY = 'pranav_skills_v2';

export const ICON_OPTIONS = [
  'Code',
  'Laptop',
  'Database',
  'Layers',
  'Zap',
  'Sparkles',
  'Activity',
  'Gamepad2',
  'Server',
  'Brain',
  'Cpu',
  'Network',
  'Cloud',
  'Lock',
  'Bug',
];

export const COLOR_OPTIONS = [
  { label: 'Purple - Indigo', value: 'from-purple-500 to-indigo-500' },
  { label: 'Blue - Yellow', value: 'from-blue-600 to-yellow-500' },
  { label: 'Blue - Dark Blue', value: 'from-blue-500 to-blue-700' },
  { label: 'Green - Emerald', value: 'from-green-500 to-emerald-600' },
  { label: 'Orange - Red', value: 'from-orange-500 to-red-500' },
  { label: 'Green - Teal', value: 'from-green-600 to-teal-600' },
  { label: 'Slate Dark', value: 'from-slate-700 to-slate-900' },
  { label: 'Cyan - Blue', value: 'from-cyan-500 to-blue-600' },
  { label: 'Purple - Pink', value: 'from-purple-500 to-pink-500' },
  { label: 'Pink - Rose', value: 'from-pink-500 to-rose-500' },
];

function withIds(list) {
  return (list || []).map((s, i) => ({
    id: s.id || `skill_${Date.now()}_${i}`,
    ...s,
  }));
}

export function getSkills() {
  if (typeof window === 'undefined') return withIds(DEFAULT_SKILLS);
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return withIds(DEFAULT_SKILLS);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return withIds(DEFAULT_SKILLS);
    return withIds(parsed);
  } catch {
    return withIds(DEFAULT_SKILLS);
  }
}

export function saveSkills(skills) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    // Notify any listeners (About page, etc.) within the same tab.
    window.dispatchEvent(new CustomEvent('skills:updated'));
  } catch {
    // ignore quota errors
  }
}

export function resetSkills() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('skills:updated'));
  } catch {
    // ignore
  }
}

export function newSkill() {
  return {
    id: `skill_${Date.now()}`,
    name: '',
    icon: 'Code',
    color: COLOR_OPTIONS[0].value,
  };
}
