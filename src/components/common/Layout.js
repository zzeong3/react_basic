import {useRef, useEffect} from 'react'; //useEffect 컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있도록 하는 Hook

export default function Layout (props) {
    const frame = useRef(null);

    useEffect(()=>{ //리액트에서 이벤트를 주는거
        //마운트 되었을때
        frame.current.classList.add('on');
        //return()=>{
            //언마운트 되었을때 - clearup 함수. useEffect 뒷정리. 잘 사용되지 않음
        //}
    },[]); // 빈배열? 뎁스를 비운다. 컴포넌트가 처음나타는 딱한번만 useEffect 호출
    
    return (
        <section className={`content ${props.name}`} ref={frame}>
            <figure>
                <img src={`${process.env.PUBLIC_URL}/img/${props.name}.jpg`} alt="" />
            </figure>
            <div className="inner">
                <h1>{props.name}</h1>
                {props.children}
            </div>
        </section>
    );
}

/*
    useEffect
    - 컴포넌트가 마운트 되었을때 
    => 처음 나타났을때. <---
    => props로 받은 값을 컴포넌트의 로컬상태로 설정할때
    => 외부 API 요청이 있을때
    => setInterval, setTimeout 통해 작업이 예약될때

    - 컴포넌트가 언마운트 되었을때
    => 사라질때
    => setInterval, setTimeout을 사용하여 등록한 작업들이 클리어 되었을때
    => 라이브러리 인스턴스가 제거되었을때

    - 컴포넌트가 업데이트 될 때
    => 특정 props가 바뀔때 

    useRef
    - js로 생각하면 쿼리셀렉터로 해당돔을 선택하는 용도(참조)
    - 변수를 저장하는 용도 : 렌더링을 발생시키지 않음 , 변하지않음
    - current : () <== 해당값이 저장됨

 */
