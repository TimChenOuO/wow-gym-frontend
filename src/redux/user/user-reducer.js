import { userActionType } from "./user-action-type";

const INITIAL_STATE = {
  userList: [],
  currentUser: null,
  userSignUpUnVaild: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload,
      };
    case userActionType.USER_LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionType.USER_LOG_OUT:
      return {
        ...state,
        currentUser: null,
      };
    case userActionType.USER_SIGN_UP_SUCCESS:
      return {
        ...state,
        userSignUpUnVaild: false,
      };
    case userActionType.USER_SIGN_UP_FAILURE:
      return {
        ...state,
        currentUser: null,
        userSignUpUnVaild: true,
      };
    case userActionType.USER_SIGN_UP_RESTART:
      return {
        ...state,
        userSignUpUnVaild: null,
      };
    default:
      return state;
  }
};

export default userReducer;
