import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './slices/UserSlice';
 import PodcastReducer from './slices/PodcastSlice'
export default configureStore ({
 reducer: {
    user : UserReducer,
    podcasts : PodcastReducer,
 }
})