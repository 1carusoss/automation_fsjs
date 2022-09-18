import { useContext } from "react";
import { useForm } from "../../hooks";
import GlobalState from "../../globalState";
import { AuthEvents } from "../../machine";
import { useGetUserQuery } from "@scalablefsjs/codegen";

const DEFAULT_STATE = {
  username: "",
  password: "",
};

export default function Login() {
  const {
    state: { username, password },
    updateByKey,
  } = useForm(DEFAULT_STATE);

  const { authService } = useContext(GlobalState);

  const { send, state } = authService;

  const { data, isFetching, refetch } = useGetUserQuery(
    {
      endpoint: process.env.REACT_APP_ENDPOINT as string,
      fetchParams: {
        headers: { "X-API-Key": process.env.REACT_APP_APIKEY as string},
      },
    },
    { username },
    { enabled: false }
  );

  async function login() {
    if(!username.length || !password.length) throw Error('Username or password missing.');

    const res = await refetch();
    if(res.isSuccess) {
      return res.data.getUser;
    } else throw res.error;
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
          placeholder: "password",
          type: "password",
          className: "input",
          value: password,
          onChange: (e) =>
            updateByKey({ key: "password", value: e.target.value }),
        }}
      />

      {isFetching && !data ? (
        <p>Loading...</p>
      ) : (
        <button
          {...{
            className: "button",
            onClick: async () => {
              send({ type: AuthEvents.LOGIN, login });
            },
          }}
        >
          Login
        </button>
      )}

      <p className="txt-sm txt-sm--err">{state?.context && state.context.errorMessage}</p>

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
