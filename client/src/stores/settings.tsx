import { create } from "zustand";

const FONT_SIZES = ['xs', 'sm', 'md', 'lg', '2xl'] as const;
export type FontSize = typeof FONT_SIZES[number];

interface LastBookChapter {
    version: string;
    book: string;
    chapter: number;
}

interface SettingsState {
    font: string;
    fontEditor: string;
    fontSize: `text-${FontSize}`;
    fontEditorSize: `text-${FontSize}`;
    theme: string;
    token: string | null;
    lastBookChapter: LastBookChapter;
    isSettingsChanged: boolean;

    setFont: (font: string) => void;
    setFontEditor: (fontEditor: string) => void;
    setFontSize: (fontSize: `text-${FontSize}`) => void;
    setFontEditorSize: (fontEditorSize: `text-${FontSize}`) => void;
    adjustFontSize: (direction: 'increase' | 'decrease') => void;
    adjustFontEditorSize: (direction: 'increase' | 'decrease') => void;
    setTheme: (theme: string) => void;
    setToken: (token: string | null) => void;
    setLastBookChapter: (lastBookChapter: LastBookChapter) => void;
    saveSettings: () => void;
    cancelSettings: () => void;
}

export function adjustFontSize(current: FontSize, direction: 'increase' | 'decrease'): `text-${FontSize}` {
    const index = FONT_SIZES.indexOf(current);
    if (index === -1) return 'text-md';
    if (direction === 'increase' && index < FONT_SIZES.length - 1) {
        return `text-${FONT_SIZES[index + 1]}`;
    } else if (direction === 'decrease' && index > 0) {
        return `text-${FONT_SIZES[index - 1]}`;
    }
    return `text-${current}`;
}

const STORAGE_KEY = 'biblify-settings';

function loadSettingsFromStorage(): Partial<SettingsState> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

const persisted = loadSettingsFromStorage();

export const useSettingsStore = create<SettingsState>((set, get) => {
    let snapshot: Partial<SettingsState> = { ...persisted };

    function updateSnapshot() {
        const state = get();
        snapshot = {
            font: state.font,
            fontEditor: state.fontEditor,
            fontSize: state.fontSize,
            fontEditorSize: state.fontEditorSize,
            theme: state.theme,
            token: state.token,
            lastBookChapter: state.lastBookChapter,
        };
    }

    const initial = {
        font: persisted.font ?? 'Inter',
        fontEditor: persisted.fontEditor ?? 'Inter',
        fontSize: persisted.fontSize ?? 'text-md',
        fontEditorSize: persisted.fontEditorSize ?? 'text-md',
        theme: persisted.theme ?? 'light',
        token: persisted.token ?? null,
        lastBookChapter: persisted.lastBookChapter ?? { version: 'nvi', book: 'gn', chapter: 1 },
        isSettingsChanged: false,
    };

    return {
        ...initial,

        setFont: (font) => set(() => ({ font, isSettingsChanged: true })),
        setFontEditor: (fontEditor) => set(() => ({ fontEditor, isSettingsChanged: true })),
        setFontSize: (fontSize) => set(() => ({ fontSize, isSettingsChanged: true })),
        setFontEditorSize: (fontEditorSize) => set(() => ({ fontEditorSize, isSettingsChanged: true })),

        adjustFontSize: (direction) => {
            const current = get().fontSize.replace('text-', '') as FontSize;
            const newSize = adjustFontSize(current, direction);
            set({ fontSize: newSize, isSettingsChanged: true });
        },
        adjustFontEditorSize: (direction) => {
            const current = get().fontEditorSize.replace('text-', '') as FontSize;
            const newSize = adjustFontSize(current, direction);
            set({ fontEditorSize: newSize, isSettingsChanged: true });
        },

        setTheme: (theme) => set(() => ({ theme, isSettingsChanged: true })),
        setToken: (token) => set(() => ({ token: token?.trim() || null, isSettingsChanged: true })),
        setLastBookChapter: (lastBookChapter) => set(() => ({ lastBookChapter, isSettingsChanged: true })),

        saveSettings: () => {
            const state = get();
            const toSave = {
                font: state.font,
                fontEditor: state.fontEditor,
                fontSize: state.fontSize,
                fontEditorSize: state.fontEditorSize,
                theme: state.theme,
                token: state.token,
                lastBookChapter: state.lastBookChapter,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
            updateSnapshot();
            set({ isSettingsChanged: false });
        },

        cancelSettings: () => {
            set({ ...snapshot, isSettingsChanged: false } as SettingsState);
        },
    };
});
