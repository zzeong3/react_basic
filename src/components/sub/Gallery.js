// b0df1caf2be4e4a4a3efd41e6897ef7b
// flickr.interestingness.getList
// 

import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Popup from '../common/Popup';
import axios from 'axios';
import Masonry from 'react-masonry-component';

export default function Gallery(){
    
    const masonryOption = { transitionDuration: '.5s' };
    const [Items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [EnableClick, setEnableClick] = useState(true);
    const [Index, setIndex] = useState(0); // 리스트랑 팝업 연결하는
    const frame = useRef(null);
    const input = useRef(null);
    const pop = useRef(null);

    /*
        interest 방식 호출
        getFlickr ({
            type : 'interest',
        })

        search 방식 버튼
        getFlickr ({
            type : 'search',
            tags : ' 검색 키워드',
        })
    */

    // 처음 마운트가 될때 정보를 요청해서 불어와야한다
    // useEffect (() => {
    //     axios.get(url).then(json) => {
    //         console.log(json.data.photos.photo);
    //     })
    // }, []);

    const getFlickr = async (opt) => {
        const key = 'b0df1caf2be4e4a4a3efd41e6897ef7b';
        const method_interest = 'flickr.interestingness.getList';
        const method_search = 'flickr.photos.search';
        const method_user = 'flickr.people.getPhotos';
        const num = 40;
        let url = ' ';
        
        if( opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
        }
        if( opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`
        }
        if( opt.type === 'user') {
            url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
        }

        const result = await axios.get(url);
        //console.log(result.data.photos.photo);
        if (result.data.photos.photo.length  === 0) return alert ('해당 검색어의 결과 이미지가 없습니다.') 
        setItems(result.data.photos.photo);

        // 셋타임아웃으로 비동기화 시키고 1초 딜레이를 준뒤 로딩바를 안보이게 false로 바뀐 뒤에 on을 프레임에 붙여서 보이게 한다.
        setTimeout(() => {
            setLoading(false);
            frame.current.classList.add('on');
            setTimeout(() => {
                setEnableClick(true);
            }, 500); // frame에 on 붙이고 위로 올라오는 모션 기간 동안 .5초 홀딩
        }, 1000); // 이미지 호출이 완료되고 masonry모션 적용시간까지 홀딩하는 1초
       
    };

    useEffect (() => getFlickr({type : 'user', user: '188875987@N03'}), [])
    // 함수의 정의 형태로 콜백함수가 들어와야한다. 함수를 단순 호출하는 형태는 읽어들일수없다.
    const showSearch = () => {
        const result = input.current.value.trim();
        input.current.value = '';

        if(!result) return alert ('검색어를 입력하세요');

        if(!EnableClick) return;
        setEnableClick(false);
        setLoading(true);
        frame.current.classList.remove('on');
        getFlickr({type : 'search', tags : result,});
    };


    return(
        <>
            <Layout name={'Gallery'}>
                {Loading && (
                    <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} className="loading" alt=""/>
                )}
                <div className="controls">
                    <nav>
                        <button onClick={() => {
                            if(!EnableClick) return;
                            // 모션중이면 false일테니  return으로 방지
                            setEnableClick(false);
                            // true로 들어와서 다시 false로 바꾸어 재이벤트 방지
                            setLoading(true);
                            frame.current.classList.remove('on');
                            getFlickr({type: 'interest'});
                        }}>
                            Interest Gallery
                        </button>
                        <button onClick={() => {
                            if(!EnableClick) return;
                            // 모션중이면 false일테니  return으로 방지
                            setEnableClick(false);
                            // true로 들어와서 다시 false로 바꾸어 재이벤트 방지
                            setLoading(true);
                            frame.current.classList.remove('on');
                            getFlickr({type : 'user', user: '188875987@N03'});
                        }}>
                            My Gallery
                        </button>
                    </nav>
                    <div className="searchBox">
                        <input type="text" ref={input} placeholder="검색어를 입력하세요." 
                        onKeyUp={(e)=>{
                            if(e.key === 'Enter') showSearch();
                        }}/>
                        <button onClick={showSearch}>Search</button>
                    </div>
                </div>
                
                <div className="frame" ref={frame}>
                    <Masonry elementType={'div'} options={masonryOption}>

                        {Items.map((item, idx) => {
                            return (
                                <article key={idx}>
                                    <div className="inner">
                                        <div className="pic" 
                                            onClick={()=>{
                                                pop.current.open(); // 자식(Popup.js)에 있는 컴포넌트 전달
                                                setIndex(idx);
                                            }}>
                                            <img 
                                            src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
                                        </div>
                                        <h2>{item.title}</h2>

                                        <div className="profile">
                                            <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={item.owner} 
                                            onError= {(e) => {
                                                e.target.setAttribute(
                                                    'src', 'https://www.flickr.com/images/buddyicon.gif'
                                                );
                                            }}
                                            />
                                            <span onClick={(e) => {
                                                if(!EnableClick) return;
                                                setEnableClick(false);
                                                setLoading(true);
                                                frame.current.classList.remove('on');
                                                getFlickr({type : 'user', user : e.target.innerText}); // 클릭한 애 텍스트가 저어어 주소로 넘어가서 그 아이디의 이미지가 불러옴
                                            }}
                                            >{item.owner}</span>
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
                            src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title}/>
                    )      
                }
                
            </Popup>
        </>
    );
}


/*
    ? 형태는 쿼리스트링하는 형태의 방법이다.
    쿼리스트링은?
    ㄴ 사용자가 입력 데이터를 전달하는 방법중 하나로 url 주소에 미리 협의된 데이터들
    파라마터를 통해 넘기는 것을 말한다.
    파라미터는 물음표 뒤에 = 으로 연결된 key value 부분을 말한다.
    url에 붙여서 추가적인 정보를 서버측에 전달하는 내용이다.
    클라이언트가 어떤 특정 리소스에 접근하고 싶어하는지의 정보를 담는것

    형식(방법)
    - 정해진 엔트포인트 주소이후에 ?를 쓰는것으로 쿼리스트링이 시작함을 알린다.
    - parameter = value로 필요한 파라미터의 값을 적는다.
    - 파라미터가 여러개일 경우 &를 붙여서 여러개의 파라미터를 넘길수 있다.
    - 엔드포인트주소/추가적인주소?파라미터=값&파라미터=값
*/