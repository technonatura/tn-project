import { UserInterface } from "types/models/User.model";
import { UserProjectInterface } from "models/userProject";
import { AuthDispatchTypes, AUTH_ACTIONS } from "../actions/auth";

export interface AuthState {
  loading: boolean;
  me?: UserInterface;
  token: string;
  fetched: boolean;
  message: string;
  self?: UserProjectInterface;
}

const defaultState: AuthState = {
  loading: true,
  message: "",
  fetched: false,
  token: "",
};

const authReducer = (
  state: AuthState = defaultState,
  action: AuthDispatchTypes
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_LOGIN_SUCCESS:
    case AUTH_ACTIONS.AUTH_SIGNUP_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { user, token, self } = action;
      // console.log("ACTION", action);
      return { ...state, token, me: user, loading: false, fetched: true, self };
    case AUTH_ACTIONS.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        fetched: true,
        message: action.message,
      };

    default:
      return state;
  }
};

export default authReducer;
