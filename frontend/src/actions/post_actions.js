const postsLoaded = (posts) => {
    return {
        type: 'POSTS_LOADED',
        payload: posts
    }
}

const postUpdateCompleted = (data) => {
    return {
        type: 'POST_UPDATE_COMPLETED',
        payload: data
    }
}

const postCreateCompleted = (data) => {
    return {
        type: 'POST_CREATE_COMPLETED',
        payload: data
    }
}

const postDeleted = (id) => {
    return {
        type: 'POST_DELETED',
        payload: id
    }
}

const upvoted = (id) => {
    return {
        type: 'UPVOTED',
        payload: id
    }
}
export {
    postDeleted,
    postUpdateCompleted,
    postCreateCompleted,
    postsLoaded,
    upvoted
};