import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import UserProfile from './components/userProfile';
import ApiBackendTestData from './components/apiBackendTestData';

import './App.css';

const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    logout,
    user: authUser,
    isLoading,
    error,
  } = useAuth0();

  const userId: string | null = authUser?.sub || null;

  if (isLoading) {
    return <div className="App">Loading ...</div>;
  }

  if (error) {
    return <div className="App">Error login. Try again.</div>;
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      {isAuthenticated ? (
        <>
          <UserProfile userId={userId}/>
          <ApiBackendTestData userId = {userId} />
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
