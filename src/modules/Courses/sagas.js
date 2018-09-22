import { call, fork, put, select, take } from 'redux-saga/effects';

import { fetchCourses } from './actions';
import { FETCH_COURSES } from './constants';

import { RSF } from '../../../config/firebase';

export function* fetchListOfCourses() {
    const channel = yield call(RSF.database.channel, `/courses`);
    console.log(channel);
    while (true) {
      const { value: courses } = yield take(channel);
      yield put(fetchCourses(courses));
    }
}

export default function* rootSaga() {
  yield [
    fork(fetchListOfCourses),
  ];
}
