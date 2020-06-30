import { userActionType } from "./user-action-type";

export const userListStart = () => ({
  type: userActionType.USER_LIST_START,
});

export const userListSuccess = (list) => ({
  type: userActionType.USER_LIST_SUCCESS,
  payload: list,
});

export const userListFailure = (err) => ({
  type: userActionType.USER_LIST_FAILURE,
  payload: err,
});

export const userLogin = (user) => ({
  type: userActionType.USER_LOG_IN,
  payload: user,
});

export const userLogout = () => ({
  type: userActionType.USER_LOG_OUT,
});

export const userSignUpStart = (user) => ({
  type: userActionType.USER_SIGN_UP_START,
  payload: user,
});

export const userSignUpSuccsee = () => ({
  type: userActionType.USER_SIGN_UP_SUCCESS,
});

export const userSignUpFailer = (err) => ({
  type: userActionType.USER_SIGN_UP_FAILURE,
  errMessage: err,
  payload: null,
});

export const userSignUpRestart = () => ({
  type: userActionType.USER_SIGN_UP_RESTART,
});
