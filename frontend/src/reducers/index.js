import postReducer from "./postReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import {combineReducers} from "redux";


const reducer = combineReducers(
    {
        post: postReducer,
        user: userReducer,
        comment: commentReducer
    }
);

export default reducer;