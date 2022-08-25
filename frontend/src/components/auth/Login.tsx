import { useContext } from "react";
import { useActor, useSelector } from "@xstate/react";
import { useForm } from "../../hooks";
import GlobalState from "../../globalState";
import { AuthEvents, AuthStates } from "../../machine";


const DEFAULT_STATE = {
  username: "",
  password: "",
};

function isResolvingSelector(state: any) {
  return state.matches(AuthStates.LOGIN_RESOLVE);
}

export default function Login() {
  const {
    state: { username, password },
    updateByKey,
  } = useForm(DEFAULT_STATE);

  const { authService } = useContext(GlobalState);

  const { send } = authService;

  const [state] = useActor(authService);

  const isResolving = useSelector(authService, isResolvingSelector);

  return (
    <div className="form">
      <input
        {...{
          placeholder: "username",
          className: "input",
          value: username,
          onChange: (e) =>
            updateByKey({ key: "username", value: e.target.value }),
        }}
      />

      <input
        {...{
          placeholder: "password",
          type: "password",
          className: "input",
          value: password,
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
            onClick: () => send({ type: AuthEvents.LOGIN, username, password }),
          }}
        >
          Login
        </button>
      )}

      <p className="txt-sm">
        Don't have an account?{" "}
        <a
          {...{
            className: "btn-lnk",
            onClick: () => send(AuthEvents.START_SIGNUP),
          }}
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
