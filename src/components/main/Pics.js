import { useSelector } from "react-redux";
import Popup from '../common/Popup';
import {useRef, useState} from 'react';

export default function Pics({Scrolled, start}) {
    // 변수 = 특정값 || 대체값;
    // 변수에 대입되는 특정값이 undefined, NaN 같이 비정상적인 값이 들어올때 대신 적용될 대체값을 설정해주는것
    const position = Scrolled - start || 0; // 0
    // position -> 전체 스크롤 거리값에서 해당 섹션요소의 세로 위치값을 뺀것으로, 처음 섹션 초입에는 0이 된다.
    const Pics = useSelector(store => store.flickrReducer.flickr)
    const pop = useRef(null);
    const [Index, setIndex] = useState(0);

    return(
        <>
        <main id="pics" className='myScroll'>
            <p 
                style={{
                        left: 100 + position,
                    }}
                // 섹션 시작부터 스크롤 모션
                // style = {
                //     position >=0 //섹션이 0이 되었어?
                //         ? {left:100 + position,}
                //         : null
                //     }
                >Flickr
            </p>
            <h3
                style={{
                    left:100 + position /2,
                }}
            >Flickr
            </h3>

            <ul>
            {Pics.map((pic, idx)=>{
                if(idx > 5) return;
                return (
                    <li key={pic.id} onClick={()=>{
                        pop.current.open();
                        setIndex(idx);
                    }}>
                        <img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt="" />
                    </li>
                )
            })}
            </ul>
        </main>

        <Popup ref={pop}>
            {Pics.length !== 0 && (
                <img 
                    src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title}/>
                )      
            }
        </Popup>
        
        </>
    )
}