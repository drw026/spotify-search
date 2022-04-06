import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface AppState  {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

export const appContext = createContext<AppState | null>(null);

export const useAppContext = () => {
    const useApp = useContext(appContext);
    if (!useApp) throw new Error('useApp was called outside the App context provider');
    return useApp;
};

export default appContext;
