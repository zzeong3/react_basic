import Layout from "../common/Layout";
import Popup from "../common/Popup";
import { useState, useEffect, useRef } from "react";
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';


export default function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector(store => store.flickr.data);
	const masonryOptions = { transitionDuration: '0.5s' };
	const [Opt, setOpt] = useState({ type: 'user', user: '188875987@N03' });
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const [Index, setIndex] = useState(0);
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);


	const showSearch = () => {
		const result = input.current.value.trim();
		input.current.value = '';

		if (!result) return alert('검색어를 입력하세요');

		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'search', tags: result, });
	};

	const showInterest = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'interest' });
	}

	const showMine = () => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'user', user: '188875987@N03' });
	}

	const showUser = (e) => {
		if (!EnableClick) return;
		setEnableClick(false);
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'user', user: e.target.innerText });
	}


	useEffect(() => {
		dispatch(fetchFlickr(Opt))
	}, [Opt])


	useEffect(() => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setEnableClick(true);
		}, 500);

	}, [Items])


	return (
		<>
			<Layout name={'Gallery'}>
				{Loading && (
					<img
						className="loading"
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
					/>
				)}

				<div className="controls">
					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={showMine}>My Gallery</button>
					</nav>

					<div className="searchBox">
						<input type="text" ref={input} placeholder='검색어를 입력하세요'
							onKeyUp={(e) => {
								if (e.key === 'Enter') showSearch();
							}} />
						<button onClick={showSearch}>Search</button>
					</div>
				</div>

				<div className="frame" ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>


						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className="inner">
										<div className="pic"
											onClick={() => {
												pop.current.open();
												setIndex(idx);
											}}
										>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title} />
										</div>
										<h2>{item.title}</h2>

										<div className="profile">
											<img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							)
						})}
					</Masonry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{Items.length !== 0 && (

					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title} />
				)

				}

			</Popup>
		</>
	);

}