import {createStore}  from 'redux';
import reducers  from "./reducer";

// store 공간에 생성한 다음 전달된 reducers를 저정해서 내보냄
const stroe = createStore(reducers);
export default stroe;