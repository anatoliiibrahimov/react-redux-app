import {
  call, fork, put, take, takeLatest,
} from 'redux-saga/effects';

import { fetchCourses, fetchAuthors } from './actions';

import { RSF } from '../../../config/firebase';
import { UPDATE_COURSE, FETCH_COURSES, CREATE_COURSE } from './constants';

export function* fetchListOfCourses() {
  const channel = yield call(RSF.database.channel, '/courses');
  console.log(channel);
  while (true) {
    const { value: courses } = yield take(channel);
    yield put(fetchCourses(courses));
  }
}

export function* fetchListOfAuthors() {
  const channel = yield call(RSF.database.channel, '/authors');
  console.log(channel);
  while (true) {
    const { value: authors } = yield take(channel);
    yield put(fetchAuthors(authors));
  }
}

export function* updateCurrentCourse(action) {
  console.log(action);
  yield call(RSF.database.patch, `/courses/${action.id}`, action.course);
}

export function* createNewCourse(action) {
  console.log(action);
  yield call(RSF.database.create, '/courses', {
    title: action.course.title ? action.course.title : '',
    category: action.course.category ? action.course.category : '',
    id: action.course.id ? action.course.id : '',
    key: action.course.key ? action.course.key : '',
    authorId: action.course.authorId ? action.course.authorId : '',
  });
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_COURSES, fetchListOfCourses),
    fork(fetchListOfAuthors),
    takeLatest(UPDATE_COURSE, updateCurrentCourse),
    takeLatest(CREATE_COURSE, createNewCourse),
  ];
}
