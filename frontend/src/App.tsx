import React from 'react';
import { Auth, User } from './components';
import { useInterpret, useSelector } from '@xstate/react';
import { authMachine, AuthModes } from './machine';
import GlobalState from './globalState';
import './app.scss';

function isAuthenticatedSelector(state: any) {
  return state.matches(AuthModes.authenticated);
}

function App() {
  const authService = useInterpret(authMachine);
  const isAuthenticated = useSelector(authService, isAuthenticatedSelector);

  return (
    <GlobalState.Provider value={{ authService }}>
    <div className="App">
      <div className="App-body">
        {
          isAuthenticated ? (
            <User />
          ) : (
            <Auth />
          ) 
        }
      </div>
    </div>
    </GlobalState.Provider>
  );
}

export default App;
