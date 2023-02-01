import { useQuery } from 'react-query';
import useGetAccessToken from '../hooks/useGetAccessToken';

const apiBackendAudience = process.env.REACT_APP_API_BACKEND_AUDIENCE as string;
const apiBackendUrl = process.env.REACT_APP_API_BACKEND_URL as string;

const testProtectedApi = async (token: string) => {
  if (token === '') {
    return;
  }

  try {
    const response = await fetch(
      `${apiBackendUrl}/api/v1/auth0test`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json()
  } catch (error: any) {
    throw error;
  }
}

const ApiBackendTestData = (props: any) => {
  const { userId } = props;

  const { data: token } = useGetAccessToken(
    apiBackendAudience,
    null
  );

  const { isLoading, isError, data} = useQuery(
    ['testProtectedApi', token, userId],
    () => testProtectedApi(token)
  );

  if (isLoading) {
    return <div>loading ...</div>
  }

  if (isError) {
    return <div>Try realoding the page.</div>
  }

  return (
    <div className="App">
      <p>API backend Ok</p>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default ApiBackendTestData;
