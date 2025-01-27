import { useReducer } from "react";

export type SettingsState = {
    font: string;
    fontEditor: string;
    fontSize: string;
    fontEditorSize: string;
    theme: string;
    token: string | null;
    lastBookChapter: { version: string, book: string, chapter: number };
};

export interface ISettingsContext {
    settings: SettingsState;
    setFont: (font: string) => void;
    setFontEditor: (fontEditor: string) => void;
    setFontSize: (fontSize: string) => void;
    setFontEditorSize: (fontEditorSize: string) => void;
    setTheme: (theme: string) => void;
    setToken: (token: string) => void;
    setLastBookChapter: (lastBookChapter: { version: string, book: string, chapter: number }) => void;
    adjustFontEditorSize: (direction: 'increase' | 'decrease') => void;
    adjustFontSize: (direction: 'increase' | 'decrease') => void;
    saveSettings: () => void;
}

type Action =
    | { type: 'SET_FONT'; payload: string }
    | { type: 'SET_FONT_EDITOR'; payload: string }
    | { type: 'SET_FONT_SIZE'; payload: string }
    | { type: 'SET_FONT_EDITOR_SIZE'; payload: string }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'ADJUST_FONT_SIZE'; payload: 'increase' | 'decrease' }
    | { type: 'ADJUST_FONT_EDITOR_SIZE'; payload: 'increase' | 'decrease' }
    | { type: 'SET_TOKEN'; payload: string | null }
    | { type: 'SET_LAST_BOOKCHAPTER'; payload: { version: string, book: string, chapter: number } }
    | { type: 'SAVE_SETTINGS' };

const FONT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const loadInitialState = (): SettingsState => ({
    font: localStorage.getItem('biblify__settings__font') || 'Inter',
    fontEditor: localStorage.getItem('biblify__settings__font_editor') || 'Inter',
    fontSize: localStorage.getItem('biblify__settings__font_size') || 'text-md',
    fontEditorSize: localStorage.getItem('biblify__settings__font_editor_size') || 'text-md',
    theme: localStorage.getItem('biblify__settings__theme') || 'light',
    token: localStorage.getItem('biblify__user_token') || null,
    lastBookChapter: JSON.parse(localStorage.getItem('biblify__user_last_bookchapter') ?? '{"version":"nvi", "book": "gn", "chapter": 1}')
});

function adjustFontSize(current: string, direction: 'increase' | 'decrease'): string {
    const index = FONT_SIZES.indexOf(current as (typeof FONT_SIZES)[number]);
    if (index === -1) return 'md';

    if (direction === 'increase' && index < FONT_SIZES.length - 1) {
        return 'text-' + FONT_SIZES[index + 1];
    } else if (direction === 'decrease' && index > 0) {
        return 'text-' + FONT_SIZES[index - 1];
    }
    return 'text-' + current;
}

function settingsReducer(state: SettingsState, action: Action): SettingsState {
    switch (action.type) {
        case 'SET_FONT':
            return { ...state, font: action.payload };
        case 'SET_FONT_EDITOR':
            return { ...state, fontEditor: action.payload };
        case 'SET_FONT_SIZE':
            return { ...state, fontSize: action.payload };
        case 'SET_FONT_EDITOR_SIZE':
            return { ...state, fontEditorSize: action.payload };
        case 'ADJUST_FONT_SIZE':
            return {
                ...state,
                fontSize: adjustFontSize(state.fontSize.split('-')[1] || 'md', action.payload),
            };
        case 'ADJUST_FONT_EDITOR_SIZE':
            return {
                ...state,
                fontEditorSize: adjustFontSize(state.fontEditorSize.split('-')[1] || 'md', action.payload),
            };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_LAST_BOOKCHAPTER':
            return { ...state, lastBookChapter: action.payload };
        case 'SAVE_SETTINGS':
            localStorage.setItem('biblify__settings__font', state.font);
            localStorage.setItem('biblify__settings__font_editor', state.fontEditor);
            localStorage.setItem('biblify__settings__font_size', state.fontSize);
            localStorage.setItem('biblify__settings__font_editor_size', state.fontEditorSize);
            localStorage.setItem('biblify__settings__theme', state.theme);
            localStorage.setItem('biblify__user_token', state.token ?? '');
            localStorage.setItem('biblify__user_last_bookchapter', JSON.stringify(state.lastBookChapter));
            return state;
        default:
            return state;
    }
}

export default function useSettings() {
    const [state, dispatch] = useReducer(settingsReducer, loadInitialState());

    return {
        settings: { ...state },
        setFont: (font: string) => dispatch({ type: 'SET_FONT', payload: font }),
        setFontEditor: (fontEditor: string) => dispatch({ type: 'SET_FONT_EDITOR', payload: fontEditor }),
        setFontSize: (fontSize: string) => dispatch({ type: 'SET_FONT_SIZE', payload: fontSize }),
        setFontEditorSize: (fontEditorSize: string) => dispatch({ type: 'SET_FONT_EDITOR_SIZE', payload: fontEditorSize }),
        adjustFontSize: (direction: 'increase' | 'decrease') =>
            dispatch({ type: 'ADJUST_FONT_SIZE', payload: direction }),
        adjustFontEditorSize: (direction: 'increase' | 'decrease') =>
            dispatch({ type: 'ADJUST_FONT_EDITOR_SIZE', payload: direction }),
        setTheme: (theme: string) => dispatch({ type: 'SET_THEME', payload: theme }),
        setToken: (token: string | null) => dispatch({ type: 'SET_TOKEN', payload: token && token.trim() !== '' ? token : null }),
        setLastBookChapter: (lastBookChapter: { version: string, book: string, chapter: number }) => dispatch({ type: 'SET_LAST_BOOKCHAPTER', payload: lastBookChapter }),
        saveSettings: () => dispatch({ type: 'SAVE_SETTINGS' }),
    };
}