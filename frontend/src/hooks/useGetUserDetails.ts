import { useEffect, useState } from 'react';
import axios from 'axios';

import useGetAccessToken from './useGetAccessToken';
const audience = process.env.REACT_APP_AUTH0_USER_MANAGEMENT_AUDIENCE as string;

const useGetUserDetails = (userId: string | null) => {

  const {
    isLoading: gettingToken,
    apiData: tokenData
  } = useGetAccessToken(
    audience,
    'read:current_user'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState({
    sub: null,
    picture: '',
    name: '',
    email: null
  });

  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (gettingToken || tokenData === '') {
      return;
    }

    if (userId === null) {
      return;
    }

    if (apiData.email === '') {
      return;
    }

    setIsLoading(true);
    const getUser = async () => {
      try {
        const url = [
          `${audience}users`,
          userId
        ].join('/');

        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        });

        setApiData(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    getUser();
  }, [userId, tokenData, gettingToken, apiData.email]);

  return { isLoading, apiData, serverError };
};

export default useGetUserDetails;
