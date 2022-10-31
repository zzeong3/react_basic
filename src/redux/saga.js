/*
saga 전용 메서드

이벤트 요청처리 함수
ㄴ takeLatest : 제일 마지막 요청만 수정
ㄴ takeEvery : 들어오는 모든 요청을 전부수행
all : saga 관련 메서드들을 비동기적으로 호출)
put : saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch랑 동일
fork : saga명령어 실행함수
call : saga에서 api관련 axios함수를 호출할때 쓰는 함수, 두번째 인수값 전달가능

*/
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMembers } from './api';
import * as types from './actionType';

// Flickr 비동기 처리 함수
//컴포넌트에서 action타입 요청시 api.js에 있는 axios함수를 연결해서 호출하는 함수
function* returnFlickr(action) {
    try {
        //컴포넌트 단에서 getFlickr에 필요한 옵션객체값만 action에 담아서 전달하면
        //saga가 call메서드로 getFLickr호출하면서 액션객체로 받은 옵션값을 getFlickr에 바인딩
        const response = yield call(getFlickr, action.Opt);
        yield put({ type: 'types.FLICKR.success', payload: response.data.photos.photo });
    } catch (err) {
        yield put ({type: 'types.FLICKR.fail', payload: err})
    }
}

//요청받은 action타입에 따라서 함수 호출
function* callFlickr() {
  //컴포넌트에서 FLICIKR_START타입 액션객체가 전달되면 해당 이벤트를 takeLatest가 받아서 returnFlickr함수 호출
  yield takeLatest('types.FLICKR.start', returnFlickr);
}



// 유투브 비동기 처리 함수
function* returnYoutube() {
    try {
        const response = yield call(getYoutube);
        yield put({ type: 'types.YOUTUBE.success', payload: response.data.items });
    } catch(err) {
        yield put ({type: 'types.YOUTUBE.fail', payload: err})
    }
   
  }
  
  function* callYoutube() {
    yield takeLatest('types.YOUTUBE.start', returnYoutube);
  }


//members 비동기 처리 함수
function* returnMembers() {
    try {
        const response = yield call(getMembers);
        yield put({ type: 'types.MEMBERS.success', payload: response.data.members });
    } catch(err) {
        yield put ({type: 'types.MEMBERS.fail', payload: err})
    }
  }

  function* callMembers() {
    yield takeLatest('types.MEMBERS.start', returnMembers);
  }
  

//store.js에 의해 reducer에 미들웨어로 적용할 rootSaga함수 생성
export default function* rootSaga() {
    yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
  }