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
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info, fetchData]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
