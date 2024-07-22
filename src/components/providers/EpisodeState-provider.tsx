"use client";
import { ReactNode, useState, createContext, useContext } from "react";

const InitialState = 1;
type EpisodeState = {
    currentEp: number;
    setCurrentEp: React.Dispatch<React.SetStateAction<number>>;
};
const EpisodeContext = createContext<EpisodeState | null>(null);
type EpisodeProviderType = {
    children: ReactNode;
};
export default function EpisodeProvider({ children }: EpisodeProviderType) {
    const [currentEp, setCurrentEp] = useState<number>(InitialState);
    return (
        <EpisodeContext.Provider value={{ currentEp, setCurrentEp }}>
            {children}
        </EpisodeContext.Provider>
    );
}

export const useEpState = () => {
    const context = useContext(EpisodeContext);
    if (!context) {
        throw Error("Episode Context should not be use outside of context");
    }
    return context;
};
