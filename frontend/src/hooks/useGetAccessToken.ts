import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useGetAccessToken = (audience: string, scope: string | null) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const getToken = async () => {
      try {
        const token: string | null = await getAccessTokenSilently({
          authorizationParams: {
            audience,
            ...( scope ? { scope }: {})
          },
        });

        setData(token);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    getToken();
  }, [getAccessTokenSilently, audience, scope]);

  return { isLoading, data, serverError };
};

export default useGetAccessToken;
