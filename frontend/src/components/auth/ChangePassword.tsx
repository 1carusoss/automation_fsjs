import { useContext } from "react";
import { useSelector } from "@xstate/react";
import GlobalState from "../../globalState";
import { AuthEvents, AuthStates } from "../../machine";
import { useForm } from "../../hooks";

const DEFAULT_STATE = {
  username: "",
  password: "",
};

function isResolvingSelector(state: any) {
  return state.matches(AuthStates.RESET_PASSWORD_RESOLVE);
}

export default function ChangePassword() {
  const {
    state: { username, password },
    updateByKey,
  } = useForm(DEFAULT_STATE);

  const { authService } = useContext(GlobalState);

  const { send } = authService;

  const isResolving = useSelector(authService, isResolvingSelector);

  return (
    <div className="form">
      <input
        {...{
          placeholder: "username",
          className: "input",
          onChange: (e) =>
            updateByKey({ key: "username", value: e.target.value }),
        }}
      />

      <input
        {...{
          placeholder: "password",
          type: "password",
          className: "input",
          onChange: (e) =>
            updateByKey({ key: "password", value: e.target.value }),
        }}
      />

      {isResolving ? (
        <p>Loading...</p>
      ) : (
        <button
          {...{
            className: "button",
            onClick: () =>
              send({ type: AuthEvents.RESET_PASSWORD, username, password }),
          }}
        >
          Submit
        </button>
      )}

      <p className="txt-sm">
        <a
          {...{
            className: "btn-lnk",
            onClick: () => send(AuthEvents.START_LOGIN),
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
}
