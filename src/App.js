import { Route, Switch } from 'react-router-dom';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMembers } from './redux/memberSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchFlickr({ type: 'user', user: '188875987@N03' }))
		dispatch(fetchYoutube());
		dispatch(fetchMembers());
	}, [])
	return (
		<>
			{/* Switch는 같은 경로의 라우터 연결시 구체적인 라우터 하나만 적용한다 */}
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>


			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/location' component={Location} />
			<Route path='/member' component={Member} />
			<Route path='/youtube' component={Youtube} />

			<Footer />
		</>

	);
}

export default App;