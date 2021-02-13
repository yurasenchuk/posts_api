const initialState = {
    comments: []
};

const comment_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COMMENTS_LOADED':
            return {
                ...state,
                comments: action.payload
            }
        case 'COMMENT_CREATE_COMPLETED':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload
                ]
            }
        case 'COMMENT_UPDATE_COMPLETED':
            const commentInd = state.comments.findIndex(comment => comment.id === action.payload.id);
            const newComment = {
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
                comments: [
                    ...state.comments.slice(0, commentInd),
                    newComment,
                    ...state.comments.slice(commentInd + 1)
                ]
            }
        case 'COMMENT_DELETED':
            const commentIndex = state.comments.findIndex(comment => comment.id === action.payload);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, commentIndex),
                    ...state.comments.slice(commentIndex + 1)
                ]
            }
        default:
            return state
    }
}

export default comment_reducer;