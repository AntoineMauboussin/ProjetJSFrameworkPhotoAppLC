import { combineReducers } from "redux";
import pictureSlice from "./slices/pictureSlice";
import userSlice from './slices/userSlice'


export default combineReducers({
    user: userSlice,
    pictures: pictureSlice
});