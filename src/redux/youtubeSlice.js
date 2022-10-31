import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// fetch 함수 정의
export const fetchYoutube = createAsyncThunk(
    'youtube/requestYoutube',// 첫번째 인수값 : 고유의 문자값 등록 (내부적으로 actionType 생성시 활용되는 값)
    async () => { // 두번쩨 인수값 : 비동기 데이터 호출하는 함수
        const key = 'AIzaSyAy6VlenkzBMN3Yy81EdqHO80h8HkvzNJw';
        const playList = 'PL-LezOK-mmmM9TeSYLloKdebev5DWkYII';
        const num = 9;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

        const response = await axios.get(url);
        return response.data.items;
    }
);

// 슬라이스 함수 생성
const youtubeSlice = createSlice({ 
    name : ' youtube', // 내부적으로 리듀서 생성시 관리하 데이터가 담길 key 값
    initialState : {
        data : [],
        isLoading : false,
    },
    extraReducers : {
        [fetchYoutube.pending] : (state) => {
            state.isLoading = true;
        },
        [fetchYoutube.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        [fetchYoutube.rejected] : (state) => {
            state.isLoading = false;
        }
    }
 });

 // 해당 슬라이스로부터 리듀서 내보냄
 export default youtubeSlice.reducer;