import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { userActionType } from "./user-action-type";
import { userListSuccess, userListFailure } from "./user-action";

export function* userListAsyncSaga() {
  try {
    const { data } = yield axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/user`
    );
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListFailure(err));
  }
}

export function* userListStartSaga() {
  yield takeLatest(userActionType.USER_LIST_START, userListAsyncSaga);
}

export function* userSaga() {
  yield all([call(userListStartSaga)]);
}
