import { createMachine, assign } from "xstate";
import { User } from '@scalablefsjs/types';

export enum AuthStates {
  LOGIN = "LOGIN_STATE_IDLE",
  LOGIN_RESOLVE = "LOGIN_STATE_RESOLVING",
  SIGNUP = "SIGNUP_STATE_IDLE",
  SIGNUP_RESOLVE = "SIGNUP_STATE_RESOLVING",
  RESET_PASSWORD = "RESET_PASSWORD_STATE_IDLE",
  RESET_PASSWORD_RESOLVE = "RESET_PASSWORD_STATE_RESOLVING",
  CONFIRM = "CONFIRM_STATE_IDLE",
  CONFIRM_RESOLVE = "CONFIRM_STATE_RESOLVING",
}

export enum AuthEvents {
  START_LOGIN = "START_LOGIN_EVENT",
  LOGIN = "LOGIN_EVENT",
  SIGNUP = "SIGNUP_EVENT",
  START_SIGNUP = "START_SIGNUP_EVENT",
  RESET_PASSWORD = "RESET_PASSWORD_EVENT",
  START_RESET_PASSWORD = "START_RESET_PASSWORD_EVENT",
  CONFIRM = "CONFIRM_EVENT",
  START_CONFIRM = "START_CONFIRM_EVENT",
  LOGOUT = "LOGOUT"
}

export enum AuthModes {
  error = "ERROR",
  idle = "IDLE",
  authenticated = "AUTHENTICATED",
  session_failure = "SESSION_FAILURE"
}

export interface AuthEvent {
  type: AuthEvents;
  user: User;
  login: () => Promise<User>;
  signup: () => Promise<any>;
}

export interface AuthContext {
  loginAttempts: number;
  autoConfirm: boolean;
  maxLoginAttempts: number;
  retryAttempts: number;
  user: User | undefined;
  errorMessage: string | undefined;
}

export interface AuthMachineProps {
  autoConfirm: boolean;
  maxLoginAttempts: number;
  maxRetryAttempts: number;

}

export const maxLogins = (ctx: AuthContext) =>
  ctx.loginAttempts < ctx.maxLoginAttempts;

export const createAuthMachine = ({
  autoConfirm,
  maxLoginAttempts,
  maxRetryAttempts,
}: AuthMachineProps) =>
  createMachine<AuthContext, AuthEvent>(
    {
      initial: AuthStates.LOGIN,
      context: {
        loginAttempts: 0,
        retryAttempts: 0,
        maxLoginAttempts,
        autoConfirm,
        user: undefined,
        errorMessage: undefined
      },
      states: {
        [AuthModes.authenticated]: {
          on: {
            [AuthEvents.LOGOUT]:  {
              target: AuthStates.LOGIN
            }
          }
        },

        [AuthModes.session_failure]: { 
          entry: assign({
            errorMessage: "Authentication failed. Try again later.",
          }),
          type: "final" 
        },

        [AuthModes.error]: {
          entry: assign({
            retryAttempts: (ctx) => ctx.retryAttempts + 1,
          }),
          on: {
            [AuthEvents.LOGIN]: {
              target: AuthStates.LOGIN_RESOLVE,
            },
            [AuthEvents.SIGNUP]: {
              target: AuthStates.SIGNUP_RESOLVE,
            },
            [AuthEvents.RESET_PASSWORD]: {
              target: AuthStates.RESET_PASSWORD_RESOLVE,
            },
            [AuthEvents.CONFIRM]: {
              target: AuthStates.CONFIRM_RESOLVE,
            },
            [AuthEvents.START_LOGIN]: {
              target: AuthStates.LOGIN,
            },
            [AuthEvents.START_SIGNUP]: {
              target: AuthStates.SIGNUP,
            },
            [AuthEvents.START_RESET_PASSWORD]: {
              target: AuthStates.RESET_PASSWORD,
            },
            [AuthEvents.START_CONFIRM]: {
              target: AuthStates.CONFIRM,
            },
          },
          always: [
            {
              target: [AuthModes.session_failure],
              cond: (ctx) => ctx.retryAttempts >= maxRetryAttempts,
            },
          ],
        },

        [AuthStates.LOGIN]: {
          entry: assign({
            loginAttempts: (ctx) => ctx.loginAttempts + 1,
          }),
          on: {
            [AuthEvents.LOGIN]: [
              {
                target: AuthStates.LOGIN_RESOLVE,
                cond: maxLogins,
              },
              {
                target: [AuthModes.session_failure],
              },
            ],
            [AuthEvents.START_SIGNUP]: {
              target: AuthStates.SIGNUP,
            },
            [AuthEvents.START_RESET_PASSWORD]: {
              target: AuthStates.RESET_PASSWORD,
            },
            [AuthEvents.START_CONFIRM]: {
              target: AuthStates.CONFIRM,
            },
          },
        },

        [AuthStates.LOGIN_RESOLVE]: {
          invoke: {
            src: (_, event) => {
              return event.login();
            },
            onDone: {
              target: AuthModes.authenticated,
              actions: assign({ user: (context, event) => {
                return event.data;
              }})
            },
            onError: {
              target: AuthModes.error,
              actions: assign({
                errorMessage: (context, event) => {
                  return event.data.message;
                }
              })
            },
          },
        },

        [AuthStates.SIGNUP]: {
          on: {
            [AuthEvents.SIGNUP]: {
              target: AuthStates.SIGNUP_RESOLVE,
            },
            [AuthEvents.START_LOGIN]: {
              target: AuthStates.LOGIN,
            },
            [AuthEvents.START_RESET_PASSWORD]: {
              target: AuthStates.RESET_PASSWORD,
            },
          },
        },

        [AuthStates.SIGNUP_RESOLVE]: {
          invoke: {
            src: (_, event) => {
              return event.signup();
            },
            onDone: {
              target: AuthStates.LOGIN
            },
            onError: {
              target: AuthModes.error,
              actions: assign({
                errorMessage: (context, event) => {
                  return event.data.message;
                }
              })
            },
          },
        },

        [AuthStates.RESET_PASSWORD]: {
          on: {
            [AuthEvents.RESET_PASSWORD]: {
              target: AuthStates.RESET_PASSWORD_RESOLVE,
            },
            [AuthEvents.START_LOGIN]: {
              target: AuthStates.LOGIN,
            },
          },
        },

        [AuthStates.RESET_PASSWORD_RESOLVE]: {
          invoke: {
            src: () => randomFetch(),
            onDone: autoConfirm ? AuthStates.LOGIN : AuthStates.CONFIRM,
            onError: AuthModes.error,
          },
        },

        [AuthStates.CONFIRM]: {
          on: {
            [AuthEvents.CONFIRM]: {
              target: AuthStates.CONFIRM_RESOLVE,
            },
          },
        },

        [AuthStates.CONFIRM_RESOLVE]: {
          invoke: {
            src: () => randomFetch(),
            onDone: AuthStates.LOGIN,
            onError: AuthModes.error,
          },
        },
      },
    },
    {
      guards: {
        maxLogins,
      },
    }
  );

export const randomFetch = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        rej("Fetch failed!");
      } else {
        res("Fetch succeeded!");
      }
    }, 2000);
  });
};

export const authMachine = createAuthMachine({
  maxLoginAttempts: 5,
  autoConfirm: true,
  maxRetryAttempts: 5,
});
