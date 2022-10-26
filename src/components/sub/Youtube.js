// key = AIzaSyAy6VlenkzBMN3Yy81EdqHO80h8HkvzNJw
// playList = PL-LezOK-mmmM9TeSYLloKdebev5DWkYII

import Layout from "../common/Layout";
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import Popup from "../common/Popup";

export default function Youtube() {

    const [Vids, setVids] = useState([]); // 비디오 리스트 뿌려주는
    const [Index, setIndex] = useState(0); // 비디오 리스트랑 팝업 연결하는
    const pop = useRef(null);

    useEffect(()=>{
        const key = 'AIzaSyAy6VlenkzBMN3Yy81EdqHO80h8HkvzNJw';
        const playList = 'PL-LezOK-mmmM9TeSYLloKdebev5DWkYII';
        const num = 9;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

        axios.get(url).then((json)=>{
            console.log(json.data.items);
            setVids(json.data.items);
        });

    }, []); // [] 한번만

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