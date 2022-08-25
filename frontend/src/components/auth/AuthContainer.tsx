import { useContext } from "react";
import { useActor, useSelector } from "@xstate/react";
import GlobalState from "../../globalState";
import { AuthEvents, AuthStates } from "../../machine";
import Login from './Login';
import Signup from './Signup';
import ChangePassword from './ChangePassword';
import "./styles.scss";

function matchState(state: any, authState: AuthStates) {
  return state.matches(authState);
}

function authStateSelector(state: any): JSX.Element {
  if (matchState(state, AuthStates.LOGIN) || matchState(state, state.matches)) {
    return <Login />
  } else if (matchState(state, AuthStates.SIGNUP || matchState(state, AuthStates.SIGNUP_RESOLVE))) {
    return <Signup />
  } else if (matchState(state, AuthStates.RESET_PASSWORD) || matchState(state, AuthStates.RESET_PASSWORD_RESOLVE)) {
    return <ChangePassword />
  } else return <Login />
}

export default function AuthContainer() {
  const { authService } = useContext(GlobalState);
  const [state] = useActor(authService);
  const authState = useSelector(authService, authStateSelector);
  return authState;
}
