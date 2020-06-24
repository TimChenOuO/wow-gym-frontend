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
