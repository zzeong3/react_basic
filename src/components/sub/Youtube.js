// key = AIzaSyAy6VlenkzBMN3Yy81EdqHO80h8HkvzNJw
// playList = PL-LezOK-mmmM9TeSYLloKdebev5DWkYII

import Layout from "../common/Layout";
import { useEffect, useState, useRef } from "react";
import Popup from "../common/Popup";
import { useSelector } from "react-redux";

export default function Youtube() {

    //const [Vids, setVids] = useState([]); // 비디오 리스트 뿌려주는
    const [Index, setIndex] = useState(0); // 비디오 리스트랑 팝업 연결하는
    const pop = useRef(null);    
    const Vids = useSelector(store => store.youtubeReducer.youtube)// 순서 1 - 처음 랜더링시 store에서 전달되는 값은 빈 배열이므로 아래 리턴문에서 순간적으로 출력되는 내용이 없음
    // 순서 3 - axios로 전달받은 값으로 기존 store 값이 변경되면 다시 Vids값에는 변경된 store 값이 재래던링 됨


    return (
        <>
        <Layout name={'Youtube'}>
            {Vids.map((data, index)=>{ //Vids로 돌리면서 
                // 문자열 가공
                const title = data.snippet.title;
                const desc = data.snippet.description;
                const date = data.snippet.publishedAt;

                return (
                    <article key={ index }>
                        <h3>{title.length >30 ? title.substr(0, 30) + '...' : title}</h3>
                        <div className="txt">
                            <p>{desc.length >100 ? title.substr(0, 100) + '...' : desc}</p>
                            <span>{date.split('T')[0]}</span>
                        </div>
                        <div className="pic" onClick={()=>{ 
                                pop.current.open(); // 자식(Popup.js)에 있는 컴포넌트 전달
                                setIndex(index);
                            }}>
                            <img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
                        </div>
                    </article>
                );
            })}
        </Layout>

        <Popup ref={pop}>
            {Vids.length !== 0 && (
                    <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameborder="0"></iframe>    
                )
            }
        </Popup>
        </>
    )
}