const initialState = {
    posts: []
};

const post_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POSTS_LOADED':
            return {
                ...state,
                posts: action.payload
            }
        case 'POST_CREATE_COMPLETED':
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.payload
                ]
            }
        case 'POST_UPDATE_COMPLETED':
            const postInd = state.posts.findIndex(post => post.id === action.payload.id);
            const newPost = {
                id: action.payload.id,
                brand: action.payload.brand,
                model: action.payload.model,
                year: action.payload.year,
                img: action.payload.img,
                price: action.payload.price,
                color: action.payload.color,
                capacity: action.payload.capacity
            }
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, postInd),
                    newPost,
                    ...state.posts.slice(postInd + 1)
                ]
            }
        case 'POST_DELETED':
            const postIndex = state.posts.findIndex(post => post.id === action.payload);
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, postIndex),
                    ...state.posts.slice(postIndex + 1)
                ]
            }
        default:
            return state
    }
}

export default post_reducer;