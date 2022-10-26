import { useEffect, useRef, useState } from 'react';
import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import Btns from "./Btns";
import Anime from '../../asset/Anime';


export default function Main() {
    const main = useRef(null);
    const pos = useRef([]);
    let secs = null;
    const [Index, setIndex] = useState(0);
    const [Scrolled, setScrolled] = useState(0);

    const getPos = () => {
        pos.current = []; // 값을 지워준다
        secs = main.current.querySelectorAll('.myScroll');
        for (const sec of secs) pos.current.push(sec.offsetTop);
        console.log(pos.current);
    }

    const activation = () => {
        const base = -window.innerHeight / 2
        // const base = 0;
        const scroll = window.scrollY;
        const btns = main.current.querySelectorAll('.scroll_navi li');

        setScrolled(scroll);
        pos.current.map((pos, idx) => {
            //현재 스크롤한 값과 pos의 값을 비교해서
            if ( scroll  >= pos + base ) {
                for(const btn of btns) btn.classList.remove('on');
                for(const sec of secs) sec.classList.remove('on');
                btns[idx].classList.add('on');
                secs[idx].classList.add('on');
            }
            // 버튼을 활성화

            // 일단 모두 비활성화

            // 특정 버튼을 활성
        });
    };

    useEffect(()=>{
        getPos();
        // 리사이즈 이벤트가 발생하면 스크롤 값을 다시 불러온다.
        window.addEventListener('resize', getPos); //마운트
        window.addEventListener('scroll', activation);

        return ()=> {
            window.removeEventListener('resize', getPos); // 클린업 함수로 청소. 언마운트
            window.removeEventListener('scroll', activation);
        }
    }, []);

    useEffect(()=>{
        new Anime(window, {
            prop : 'scroll',
            value : pos.current[Index],
            duration : 500,
        })
    }, [Index]);

    /*
        리액트를 사용하는 프로젝트에서도 간혹 리얼돔을 직접 선택해야 하는 상황이 종종 발생한다
        예) input에 focus를 주거나, 지금과 같은 스크롤 위치 알아내기, 특정 DOM의 크기를 측정할때

        왜 리액트에서 쿼리셀렉터를 지양하라고 하는가?
        이유는 리얼돔보다 가상돔의 참조값이 리액트에게는 더 신뢰할만한 값이기 때문이다
        그래서 Ref를 이용해서 참조한다

        그러면 쿼리셀렉터는 사용하면 안되는것일까? 아니다!
        document.querySeletor - 명령형
        (a-c : a->b, b->3, 3->c로 꼭)
        main.current.querySelector - 선언형
        (a-c가는 길은 너가 정해) 리액트는 선언형을 추구합니다.

        ref가 있는데 왜 쿼리셀렉터?
        ref도 남발하면 문제가 된다.

        결론은 ref든 쿼리셀렉터든 리액트의 생명주기 싸이클에 영향을 주면 안된다

    */

    return(
        <main ref = {main} className='myScroll'>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics Scrolled={Scrolled} start={pos.current[2]}/>
            <Vids />
            <Btns setIndex={setIndex} />
        </main>
    )
}