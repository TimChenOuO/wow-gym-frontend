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
    default:
      return state;
  }
};

export default userReducer;
