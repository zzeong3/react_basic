import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<HashRouter>
    <Provider store={store}>
		  <App />
    </Provider>
	</HashRouter>,
	document.getElementById('root')
);

/*
  SSR (Server Side Rendering) 
  - 메뉴링크를 클릭할 때 마다 브라우저가 서버에 각각의 html 파일을 요청해서 화면 랜더링하는것
  - 장점 : 초기 로딩속도 빠른편
  - 단점 : 페이지 이동시 화면이 깜빡이면서 서브페이지를 서버쪽에 요청해
            페이지 이동시 화면에서 변경될 필요가 없는 공통영역까지 모조리 변경함

  CSR (Client Side Rendering)
  - 모든 컴포넌트들을 jsx자바스크립트 파일형태로 초기 로딩시 모두 불러옴
  - 장점 : 메뉴 이동시 부드럽게 실시간으로 서브 컨텐츠를 보여주다 (서버쪽에 요청을 안한다.)
            메뉴 이동시 변경될 부분만 실시간으로 바꿔준다 (컴포넌츠 때문에)
  - 단점 : 초기 로딩속도가 비교적 느림
  - 뭔가 화면의 변화가 많은 동적인 UI구현시 속도가 빠르기 때문에 훌륭하다.


  DOM (Document Object Model) 
  - html, css 문법들을 브라우저가 해석을 해서 자바스크립트가 제어 가능한 객체 형태로 변환해서 화면에 출력하는 요소
  cf) BOM (Borwer Object Model) - 해석된 내용이 출력되는 대상

  Real DOM
    - HTML파일에 입력 내용을 토대로 화면에 출력된 DOM
  Virtual DOM
    - JSX문법을 통해서 실제 브라우저에 real DOM으로 출력되기 전 메모리상에서 빠르게 만들어지는 가상 DOM
    JSX란? HTML태그는 아니지만 자바스크립트 virtual DOM을 쉽게 만들기 위한 문법체계

 */