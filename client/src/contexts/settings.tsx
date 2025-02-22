import { createContext, useContext } from "react";
import useSettings, { ISettingsContext, loadInitialState } from "@/hooks/use-settings";

const SettingsContext = createContext<ISettingsContext>({
    settings: () => loadInitialState(),
    setFont: () => { },
    setFontEditor: () => { },
    setFontSize: () => { },
    setFontEditorSize: () => { },
    setTheme: () => { },
    setToken: () => { },
    setLastBookChapter: () => { },
    adjustFontEditorSize: () => { },
    adjustFontSize: () => { },
    saveSettings: () => { },
    cancelSettings: () => { },
    isSettingsChanged: false    
});

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        settings,
        setFont,
        setFontEditor,
        setFontSize,
        setFontEditorSize,
        setLastBookChapter,
        setTheme,
        setToken,
        adjustFontEditorSize,
        adjustFontSize,
        saveSettings,
        cancelSettings,
        isSettingsChanged, 
    } = useSettings();

    return (
        <SettingsContext.Provider
            value={{
                settings,
                setFont,
                setFontEditor,
                setFontSize,
                setFontEditorSize,
                setLastBookChapter,
                setTheme,
                setToken,
                adjustFontEditorSize,
                adjustFontSize,
                saveSettings,
                cancelSettings,
                isSettingsChanged, 
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

const useSettingsContext = () => useContext(SettingsContext);

export { SettingsContext, SettingsProvider, useSettingsContext };
