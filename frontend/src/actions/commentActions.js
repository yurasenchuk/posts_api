const commentsLoaded = (comments) => {
    return {
        type: 'COMMENTS_LOADED',
        payload: comments
    }
}

const commentUpdateCompleted = (data) => {
    return {
        type: 'COMMENT_UPDATE_COMPLETED',
        payload: data
    }
}

const commentCreateCompleted = (data) => {
    return {
        type: 'COMMENT_CREATE_COMPLETED',
        payload: data
    }
}

const commentDeleted = (id) => {
    return {
        type: 'COMMENT_DELETED',
        payload: id
    }
}

export {commentUpdateCompleted, commentCreateCompleted,commentDeleted, commentsLoaded};