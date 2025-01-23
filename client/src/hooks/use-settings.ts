import { useReducer } from "react";

type SettingsState = {
    font: string;
    fontEditor: string;
    fontSize: string;
    fontEditorSize: string;
    theme: string;
    token: string | null;
};

type Action =
    | { type: 'SET_FONT'; payload: string }
    | { type: 'SET_FONT_EDITOR'; payload: string }
    | { type: 'SET_FONT_SIZE'; payload: string }
    | { type: 'SET_FONT_EDITOR_SIZE'; payload: string }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'ADJUST_FONT_SIZE'; payload: 'increase' | 'decrease' }
    | { type: 'ADJUST_FONT_EDITOR_SIZE'; payload: 'increase' | 'decrease' }
    | { type: 'SET_TOKEN'; payload: string | null }
    | { type: 'SAVE_SETTINGS' };

const FONT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const loadInitialState = (): SettingsState => ({
    font: localStorage.getItem('biblify__settings__font') || 'Inter',
    fontEditor: localStorage.getItem('biblify__settings__font_editor') || 'Inter',
    fontSize: localStorage.getItem('biblify__settings__font_size') || 'text-md',
    fontEditorSize: localStorage.getItem('biblify__settings__font_editor_size') || 'text-md',
    theme: localStorage.getItem('biblify__settings__theme') || 'light',
    token: localStorage.getItem('biblify__user_token') || null,
});

function adjustFontSize(current: string, direction: 'increase' | 'decrease'): string {
    const index = FONT_SIZES.indexOf(current as (typeof FONT_SIZES)[number]);
    if (index === -1) return 'md';

    console.log({ current, direction, index })
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
        case 'SAVE_SETTINGS':
            localStorage.setItem('biblify__settings__font', state.font);
            localStorage.setItem('biblify__settings__font_editor', state.fontEditor);
            localStorage.setItem('biblify__settings__font_size', state.fontSize);
            localStorage.setItem('biblify__settings__font_editor_size', state.fontEditorSize);
            localStorage.setItem('biblify__settings__theme', state.theme);
            localStorage.setItem('biblify__user_token', state.token ?? '');
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
        saveSettings: () => dispatch({ type: 'SAVE_SETTINGS' }),
    };
}