// key = AIzaSyAy6VlenkzBMN3Yy81EdqHO80h8HkvzNJw
// playList = PL-LezOK-mmmM9TeSYLloKdebev5DWkYII

import Layout from "../common/Layout";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Popup from "../common/Popup";

export default function Youtube() {

    const [Index, setIndex] = useState(0); // 비디오 리스트랑 팝업 연결하는
    const pop = useRef(null);
    const Vids = useSelector(store => store.youtube.data);


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