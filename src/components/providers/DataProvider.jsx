import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const DataContext = createContext({});

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = useCallback(async (url, { signal }) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url, { signal });

      if (signal.aborted) {
        return;
      }

      setIsFetching(false);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (e) {
      if (e.name === 'CanceledError') {
        return;
      }
      setIsFetching(false);
      setIsError(true);
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchData(apiURL, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [apiURL, fetchData]);

  const applyFilters = useCallback((options) => {
    const url = new URL(API_URL);
    Object.entries(options).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });

    setActivePage(0);
    setApiURL(url.toString());
  }, []);

  const resetFilters = useCallback(() => {
    setActivePage(0);
    setApiURL(API_URL);
  }, []);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      applyFilters,
      resetFilters
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      applyFilters,
      resetFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
