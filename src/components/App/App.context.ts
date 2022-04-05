import { createContext, useContext } from 'react';
import { SearchResult } from '../Search/service/search';

export interface AppState  {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    searchResult: SearchResult | undefined;
    setSearchResult:  React.Dispatch<React.SetStateAction<SearchResult | undefined>>;
}

export const appContext = createContext<AppState | null>(null);

export const useAppContext = () => {
    const useApp = useContext(appContext);
    if (!useApp) throw new Error('useApp was called outside the App context provider');
    return useApp;
};

export default appContext;
