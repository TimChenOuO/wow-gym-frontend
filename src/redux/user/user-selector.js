import { createSelector } from "reselect";

const userSelect = (state) => state.user;

export const currentUserSelect = createSelector(
  [userSelect],
  (user) => user.currentUser
);

export const userListSelect = createSelector(
  [userSelect],
  (user) => user.userList
);
