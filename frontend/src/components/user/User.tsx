import { useContext } from "react";
import GlobalState from "../../globalState";
import { AuthEvents } from "../../machine";
import "./user.scss";

export default function User() {
  const { authService } = useContext(GlobalState);

  const { send, state: { context: { user } } } = authService;

  return (
    <div className="user-panel-container">
      <div className="user-panel">
        <h1>{user.username}</h1>
        <p>{user.name}</p>
        <button
          {...{
            className: "button",
            onClick: () => send(AuthEvents.LOGOUT),
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
