import { useContext } from 'react';
import { useActor } from '@xstate/react';
import GlobalState from '../../globalState';
import { AuthEvents } from '../../machine';
import "./user.scss";

export default function User() {
  const { authService } = useContext(GlobalState);

  const { send } = authService;
  
  return (
    <div className="user-panel-container">
      <div className="user-panel">
        <h1>@icecream</h1>
        <p>Cream Ice</p>
        <button {...{
          className: "button",
          onClick: () => send(AuthEvents.LOGOUT)
        }}>Log out</button>
      </div>
    </div>
  );
}
