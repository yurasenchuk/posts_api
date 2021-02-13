import post_reducer from "./post_reducer";
import user_reducer from "./user_reducer";
import comment_reducer from "./comment_reducer";
import {combineReducers} from "redux";


const reducer = combineReducers(
    {
        post: post_reducer,
        user: user_reducer,
        comment: comment_reducer
    }
);

export default reducer;