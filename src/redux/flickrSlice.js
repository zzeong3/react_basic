import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//fetch함수 정의
export const fetchFlickr = createAsyncThunk(
  'flickr/requestFlickr',
  async (opt) => {
    const key = '4612601b324a2fe5a1f5f7402bf8d87a';
    const method_interest = "flickr.interestingness.getList";
    const method_search = "flickr.photos.search";
    const method_user = "flickr.people.getPhotos";
    const num = 20;
    let url = '';

    if (opt.type === 'interest') {
      url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    }
    if (opt.type === 'search') {
      url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    }
    if (opt.type === 'user') {
      url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
    }

    const response = await axios.get(url);
    return response.data.photos.photo;
  }
);

const flickrSlice = createSlice({
  name: 'flickr',
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [fetchFlickr.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFlickr.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [fetchFlickr.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});


export default flickrSlice.reducer;