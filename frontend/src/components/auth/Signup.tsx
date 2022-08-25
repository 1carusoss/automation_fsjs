import { useContext } from "react";
import { useActor, useSelector } from "@xstate/react";
import GlobalState from "../../globalState";
import { AuthEvents, AuthStates } from "../../machine";
import { useForm } from "../../hooks";

const DEFAULT_STATE = {
  username: "",
  password: "",
  confirmPassword: "",
};

function isResolvingSelector(state: any) {
  return state.matches(AuthStates.SIGNUP_RESOLVE);
}

export default function Signup() {
  const {
    state: { username, password, confirmPassword },
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
          type: "Password",
          className: "input",
          value: password,
          onChange: (e) =>
            updateByKey({ key: "password", value: e.target.value }),
        }}
      />

      <input
        {...{
          placeholder: "confirm password",
          type: "password",
          className: "input",
          value: confirmPassword,
          onChange: (e) =>
            updateByKey({ key: "confirmPassword", value: e.target.value }),
        }}
      />

      {isResolving ? (
        <p>Loading...</p>
      ) : (
        <button
          {...{
            className: "button",
            onClick: () =>
              send({ type: AuthEvents.SIGNUP, username, password }),
          }}
        >
          Sign up
        </button>
      )}

      <p className="txt-sm">
        Already have an account?{" "}
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
