import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import logo from './logo.svg';
import './App.css';

const App = () => {
  const { loginWithRedirect, isAuthenticated, logout, user, isLoading } = useAuth0();
  console.log({  user, isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <div className="App">Loading ...</div>
    );
  }
  return (
    <div className="App">
      <h1>Welcome</h1>
      {isAuthenticated && user ? (
        <>
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
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
}

export default App;
