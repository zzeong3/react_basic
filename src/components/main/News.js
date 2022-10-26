import { useEffect, useState } from "react"

export default function News() {

    // 초기 데이터 기능은 커뮤니티에서 -> 뉴스로 옮김 (초기셋팅은 여기서)
    const getLocalData = () => {   
        const dummyPosts = [
            {
                title : 'hello5',
                content : 'here comes description in details5'
            },
            {
                title : 'hello4',
                content : 'here comes description in details4'
            },
            {
                title : 'hello3',
                content : 'here comes description in details3'
                // , enabledUpdate : true
            },
            {
                title : 'hello2',
                content : 'here comes description in details2'
            },
            {
                title : 'hello1',
                content : 'here comes description in details1'
            },
        ];

        const data = localStorage.getItem('post');

        if(data){
            return JSON.parse(data);
        } else {
            return dummyPosts;
        }
    };
    //const [Posts, setPosts] = useState([]);

    const [Posts] = useState(getLocalData()); 


    useEffect(() => {
        localStorage.setItem('post', JSON.stringify(Posts));
    }, []);


    return(
        <main id="news" className='myScroll'>
            <h1>News</h1>
            {Posts.map((post, idx) => {
                if (idx >=5) return; // 5개의 인덱스만 가져다 달라는 의미

                return(
                    <article key={idx}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </article>
                )
            })} 
        </main>
        
    );
}