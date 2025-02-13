import { createContext, useContext, useState } from "react";

interface INotationContext {
    saveIsPending: boolean;
    setSaveIsPending: (pending: boolean) => void;
}

const NotationContext = createContext<INotationContext | undefined>(undefined);

const NotationProvider = ({ children }: { children: React.ReactNode }) => {
    const [saveIsPending, setSaveIsPending] = useState(false);

    return (
        <NotationContext.Provider
            value={{
                saveIsPending,
                setSaveIsPending
            }}
        >
            {children}
        </NotationContext.Provider>
    );
};

const useNotationContext = () => {
    const context = useContext(NotationContext);
    if (!context) {
        throw new Error("useNotationContext deve ser usado dentro de um NotationProvider");
    }
    return context;
};

export { NotationProvider, useNotationContext };
