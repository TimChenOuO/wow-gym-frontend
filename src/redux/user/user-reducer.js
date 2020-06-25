import { userActionType } from "./user-action-type";

const INITIAL_STATE = {
  userList: [],
  currentUser: null,
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
    default:
      return state;
  }
};

export default userReducer;
