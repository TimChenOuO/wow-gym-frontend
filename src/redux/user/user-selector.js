import { createSelector } from "reselect";

const userSelect = (state) => state.user;

export const currentUserSelect = createSelector(
  [userSelect],
  (user) => user.currentUser
);

export const userSignUpUnVaildSelect = createSelector(
  [userSelect],
  (user) => user.userSignUpUnVaild
);

export const userListSelect = createSelector(
  [userSelect],
  (user) => user.userList
);
