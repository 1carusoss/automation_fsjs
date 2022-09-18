import { useContext, useId } from "react";
import GlobalState from "../../globalState";
import { AuthEvents } from "../../machine";
import { useForm } from "../../hooks";
import { useCreateUserMutation } from "@scalablefsjs/codegen";

const DEFAULT_STATE = {
  username: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function Signup() {
  const {
    state: { username, password, confirmPassword, name },
    updateByKey,
    reset,
  } = useForm(DEFAULT_STATE);

  const { authService } = useContext(GlobalState);

  const { send, state } = authService;

  const { isLoading, mutateAsync } = useCreateUserMutation(
    {
      endpoint: process.env.REACT_APP_ENDPOINT as string,
      fetchParams: {
        headers: { "X-API-Key": process.env.REACT_APP_APIKEY as string},
      },
    },
  );

  const id = useId();

  async function createUser() {
    if (
      !username.length &&
      !name.length &&
      !password.length &&
      !confirmPassword.length
    )
      throw Error("Username, name, or password missing.");

    if (password !== confirmPassword) throw Error("Passwords don't match.");

    const res = await (
      await mutateAsync({ input: { username, id, name } })
    ).createUser;

    if (!res) {
      throw Error("Something went wrong! Try again!");
    } else {
      reset();
      return res;
    }
  }

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
          placeholder: "name",
          className: "input",
          value: name,
          onChange: (e) => updateByKey({ key: "name", value: e.target.value }),
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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button
          {...{
            className: "button",
            onClick: () =>
              send({ type: AuthEvents.SIGNUP, signup: createUser }),
          }}
        >
          Sign up
        </button>
      )}

      <p className="txt-sm txt-sm--err">
        {state?.context && state.context.errorMessage}
      </p>

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
