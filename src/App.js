import { Route, Switch } from 'react-router-dom';
// 유투브 메인으로 불러야할 준비!
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import './scss/style.scss';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Youtube from './components/sub/Youtube';
// import * as types from './redux/actionType';

function App() {
  const dispatch = useDispatch();

  dispatch({ type: 'types.MEMBERS.start' });

	useEffect(() => {
		// dispatch({
    //   type: 'types.YOUTUBE.start'
    })

		

    dispatch({
      type: 'types.FLICKR.start',
      Opt: {type : 'user', user: '188875987@N03'}
    })
	}, []);
    

  return (
    <>
      {/* Switch는 같은 경로의 라우터 연결시 구체적인 라우터 하나만 적용한다. */}
      <Switch>

        <Route exact path='/' component={Main} />
        <Route path='/' render={()=><Header type={'sub'} />} />
            {/* 서브페이지 모두에 적용하는 header로 '/' 이후에 어떤 주소가 있으면 서브페이지의 헤더로 인식하여 이곳의 헤더를 읽어준다. */}
            {/* <Header type={'sub'} /> */}
            {/* props으로 type={'sub'}으로 메인 props이 있는 스타일을 적용시켜 서브 헤더를 스타일링하게 한다 */}
            {/* render 함수 props으로 헤더 연결 */}

      </Switch>
      
      

      {/* <Route path='/department' component={Department} /> */}
      <Route path='/youtube' component={Youtube} />
      {/* <Route path='/gallery' component={Gallery} /> */}
      <Route path='/community' component={Community} />
      <Route path='/location' component={Location} />
      <Route path='/member' component={Member} />

      
      <Switch>
        <Route exact path='/'>
          <Footer type={'main'} />
        </Route>

        <Route path='/'>
          <Footer type={'sub'} />
        </Route>
      </Switch>
      


      {/* 
      react-router-dom
      HashRouter : github 배포때문에, 원래는 BrowerRouter : ?
      라우터가 붙은 아이들만 경로로 교체 -> 
      한페이지에 컴포넌트를 교체해서 이동한거 처럼 보임

	  <Route path='/department'>
        <Department />
      </Route>

      
      <Route path='/youtube'>
        <Youtube />
      </Route>
      
      <Route path='/gallery'>
        <Gallery />
      </Route>

      <Route path='/community'>
        <Community />
      </Route>

      <Route path='/location'>
        <Location />
      </Route>

      <Route path='/member'>
        <Member />
      </Route> */}
  
      
    </>
  );
}

export default App;

