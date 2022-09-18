import { useContext } from "react";
import { useSelector } from "@xstate/react";
import GlobalState from "../../globalState";
import { AuthStates } from "../../machine";
import Login from './Login';
import Signup from './Signup';
import ChangePassword from './ChangePassword';
import "./styles.scss";

function matchState(state: any, authState: AuthStates) {
  return state.matches(authState);
}

function authStateSelector(state: any): JSX.Element {
  if(state.value === "ERROR") {
    state = state.history;
  }

  if (matchState(state, AuthStates.LOGIN) || matchState(state, AuthStates.LOGIN_RESOLVE)) {
    return <Login />
  } else if (matchState(state, AuthStates.SIGNUP) || matchState(state, AuthStates.SIGNUP_RESOLVE)) {
    return <Signup />
  } else if (matchState(state, AuthStates.RESET_PASSWORD) || matchState(state, AuthStates.RESET_PASSWORD_RESOLVE)) {
    return <ChangePassword />
  } else return <Login />
}

export default function AuthContainer() {
  const { authService } = useContext(GlobalState);
  const authState = useSelector(authService, authStateSelector);
  return authState;
}
