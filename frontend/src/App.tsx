import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './App.css';

const apiBackendAudience = process.env.REACT_APP_API_BACKEND_AUDIENCE as string;
const apiBackendUrl = process.env.REACT_APP_API_BACKEND_URL as string;

const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [apiBackendData, setApiBackendResponse] = useState(null);

  useEffect(() => {
    (async () => {
      let token: string = '';
      try {
        token = await getAccessTokenSilently({
          authorizationParams: {
            audience: apiBackendAudience,
            scope: 'read:current_user update:current_user_metadata all',
          },
        });
      } catch (error) {
        console.log('Error getting token', error);
        throw error;
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
        setApiBackendResponse(await response.json())
      } catch (error) {
        console.log('Error hitting api/v1/auth0test');
        // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div className="App">Loading ...</div>;
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      {isAuthenticated && user ? (
        <>
          <div>
            <img src={user?.picture} alt={user?.name} />
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          {apiBackendData && (
            <>
              <p>API backend Ok</p>
              <pre>{JSON.stringify(apiBackendData)}</pre>
            </>
          )}
          <button
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </>
      )}
    </div>
  );
};

export default App;
