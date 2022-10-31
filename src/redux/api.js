import axios from 'axios';


export const getFlickr = async (opt) => {
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
        url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    }
    if( opt.type === 'user') {
        url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
    }

    return await axios.get(url);
};

export const getYoutube = async () => {
    const key = 'AIzaSyDt_yYOOKA1cIvOCCBGr563o9Hnu3ldSg8';
    const playlist = "PL-LezOK-mmmM9TeSYLloKdebev5DWkYII";
    const num = 6;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    return await axios.get(url);
}

export const getMembers = async () => {
    const url = process.env.PUBLIC_URL + '/DB/members.json';
    return await axios.get(url);
  }

    // const result = await axios.get(url);
    // //console.log(result.data.photos.photo);
    // if (result.data.photos.photo.length  === 0) return alert ('해당 검색어의 결과 이미지가 없습니다.') 
    // setItems(result.data.photos.photo);

    // // 셋타임아웃으로 비동기화 시키고 1초 딜레이를 준뒤 로딩바를 안보이게 false로 바뀐 뒤에 on을 프레임에 붙여서 보이게 한다.
    // setTimeout(() => {
    //     setLoading(false);
    //     frame.current.classList.add('on');
    //     setTimeout(() => {
    //         setEnableClick(true);
    //     }, 500); // frame에 on 붙이고 위로 올라오는 모션 기간 동안 .5초 홀딩
    // }, 1000); // 이미지 호출이 완료되고 masonry모션 적용시간까지 홀딩하는 1초
   


/*
    redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
    부수 효과 (Side Effect) : DOM 같이 컴포넌트가 직접 제어해야 되는 화면의 변경점을 야기시키는 효과 (web api가 개입하는 순수자바스크립로 처리 불가능한 기능)
    순수함수 (Pure Function) : 부수효과를 발생시키지 않는 순수 자바스크립트로만 구현 가능함 함수

*/