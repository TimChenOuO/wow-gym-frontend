import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { userActionType } from "./user-action-type";
import {
  userListSuccess,
  userListFailure,
  userSignUpFailer,
  userLogin,
  userSignUpSuccsee,
} from "./user-action";

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

// User Sign up
export function* userSignUpAsync({ payload }) {
  try {
    const { data } = yield axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/InsertUser`,
      payload
    );
    if (data.success) {
      yield put(userSignUpSuccsee());
      yield put(userLogin(data.currentUser));
    } else {
      yield put(userSignUpFailer(data));
    }
  } catch (err) {
    yield put(userSignUpFailer(err));
  }
}

export function* userSignUpStartSaga() {
  yield takeLatest(userActionType.USER_SIGN_UP_START, userSignUpAsync);
}

export function* userSaga() {
  yield all([call(userListStartSaga), call(userSignUpStartSaga)]);
}
