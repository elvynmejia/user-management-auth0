import { useEffect, useState } from 'react';
import useGetAccessToken from './useGetAccessToken';

const apiBackendAudience = process.env.REACT_APP_API_BACKEND_AUDIENCE as string;
const apiBackendUrl = process.env.REACT_APP_API_BACKEND_URL as string;

const useTestProtectedApi = (userId: string | null) => {
  const {
    isLoading: gettingToken,
    apiData: tokenData
  } = useGetAccessToken(
    apiBackendAudience,
    null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState({
    endpoint: ''
  });

  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (gettingToken || tokenData === '') {
      return;
    }

    if (userId === null) {
      return;
    }

    if (apiData.endpoint !== '') {
      return;
    }

    setIsLoading(true);
    const testProtectedApi = async () => {
      try {
        const response = await fetch(
          `${apiBackendUrl}/api/v1/auth0test`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${tokenData}`,
            },
          }
        );
        setApiData(await response.json());
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    }
    testProtectedApi();
  }, [gettingToken, tokenData, userId, apiData.endpoint]);

  return { isLoading, apiData, serverError };
}

export default useTestProtectedApi;
