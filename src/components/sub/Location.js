import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

export default function Location () {
    const {kakao} = window;
    // widow객체에 등록되어 있는 카카오키를 변수명으로 비구조화할당을 한것
    // 윈도우 객체가 카카오 객체를 사용할수 있도록 하는 코드 - 타입스크립트는 카카오 맵을 못읽어서
    // const kakao = (window).kakao; 이모양이 바뀜

    //var container = document.getElementById('map');
    //리얼돔에서 참조하는 방법으로 해당 방법은 가상돔안 리액트에서는 사용할수없다.
    //그래서 리액트에서 useRef라는 훅을 이용해서 가상으로 생섣된 DOM을 참조할수있다.

    const info = [
        {
            title : "본점",
            latlng : new kakao.maps.LatLng(37.507025, 126.756348),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker1.png`,
            imgSize : new kakao.maps.Size(232, 99),
            imgPos : {offset: new kakao.maps.Point(116, 69)}
        },
        {
            title : "지점1",
            latlng : new kakao.maps.LatLng(37.5116828, 127.059151),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker2.png`,
            imgSize : new kakao.maps.Size(232, 99),
            imgPos : {offset: new kakao.maps.Point(116, 69)}
        },
        {
            title : "지점2",
            latlng : new kakao.maps.LatLng(37.5258975, 126.9284261),
            imgUrl : `${process.env.PUBLIC_URL}/img/marker3.png`,
            imgSize : new kakao.maps.Size(232, 99),
            imgPos : {offset: new kakao.maps.Point(116, 69)}
        },
    ]

    const container = useRef(null);
    // useRef를 이용해서 가상돔을 참조 할 변수로 컨테이너를 생성한뒤, null 값으로 빈 구역을 만들어둠.
    const btns = useRef(null);
    const [Location, SetLocation] = useState(null);
    // useEffect에서 만들어진 지도 인스턴스를 담을 state를 생성하는것
    const [Traffic, setTraffic] = useState(false);
    // Traffic 토클 기능 구현을 위한 state값을 추가, 불린값을 부여한다. 스위치가 가능한 불린값을 주는것
    const [Info] = useState(info); 
    //setInfo는 info가 바뀔일이 없으므로 필요가 없다.
    const [Index, setIndex] = useState(0);
    // index가 변화될때 렌더링 필요하므로 useState에 담아 관리한다.
 

    // 1차로 지도를 쫙 뿌려줌
    const option = { //지도를 생성할 때 필요한 기본 옵션
        center: Info[Index].latlng, //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    };

    // 마커 보여줄 좌표를 markerPosition 변수로 넣음
    const markerPosition = Info[Index].latlng;
    // 마커 이미지 변경에 필요한 정보값 3개를 등록
    const imageSrc = Info[Index].imgUrl;
    const imageSize = Info[Index].imgSize;
    const imageOption = Info[Index].imgPos;
    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
    )

    // 2차 넣은 좌표 markerPosition을 카카오랑 연결 해서 marker 변수로 넣음
    const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
    });
    // 위치 인스턴스 값을 인수로 전달해서 다시 마커 인스턴스 생성


    // 맵api 리액트로 옮기는 
    useEffect(()=>{
        container.current.innerHTML = ''; // 포폴가이드에 어필!

        // 지도 인스턴스 최종 생성
        const map_instance = new kakao.maps.Map(container.current, option);
        // 지도 인스턴스를 활용해서 마커를 생성하는 코드 (우리가 지정한 마커)
        marker.setMap(map_instance); // 우리가 만든 함수를 카카오가 만든 함수(setMap)에 넣기, (좌표, 이미지)
        SetLocation(map_instance);

        //지도, 스카이뷰
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        const zoomControl = new kakao.maps.ZoomControl();
        map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


        // 본점,지점1/2 on클래스 토글
        for (const btn of btns.current.children) btn.classList.remove('on');
        btns.current.children[Index].classList.add('on');

        window.addEventListener('resize', ()=>{
            map_instance.setCenter(Info[Index].latlng);
        });

    }, [Index]); // 기존 컴포넌트가 처음 마우튼 되었을 때만 지도를 출력하던 방삭에서, Index가  변경될때마다 지도가 다시 랜더링 되는 방식으로 바꿈


    // 트래픽 토글 전용 useEffect 
    useEffect(()=>{
        if(!Location) return;
        // Location state 값은 두번째 호출부터 값이 담겨 사이클일 돌아가므로 처음 값이 존재 하지 않는 초기 오류방지를 위해 조건문 처리함

        //traffic 값에 따라서 생성과 삭제로 나누어서 코드 실행, 초기 값은 fasle
        Traffic 
            ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) 
            : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)

    }, [Traffic]); //=> traffic state 값이 변경될때 마다 실행 되는 구문'


    return (
        <Layout name={'Location'}>
            <div id="map" ref= {container}></div>
            {/* 
                기존의 두개의 버튼에서 한개의 토글버튼으로 바꿈
                버튼 클릭시 Traffic 값 반전처리
            */}
            <div className="btnSet">
                <button onClick={()=>{ setTraffic(!Traffic) }}>
                    {/* Traffic의 값에 따라서 버튼의 내용도 변경 */}
                    {Traffic ? 'Traffiic OFF' : 'Traffiic ON'}
                </button>
                <ul className="branch" ref={btns}>
                    {/* 각 버튼을 클릭할때마다 Index의 값을 변경 */}
                    {/* <li onClick={()=>setIndex(0)}>본점</li>
                    <li onClick={()=>setIndex(1)}>지점1</li>
                    <li onClick={()=>setIndex(2)}>지점2</li> */}
                    {
                        Info.map((el, idx)=>{

                            return(
                                <li key={idx} onClick={()=>{setIndex(idx)}}>
                                    {el.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>  
        </Layout>
    )
}