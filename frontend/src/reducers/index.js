const getTokenData = (token) => {
    return token ? JSON.parse(atob(token.split('.')[1])) : null
}

const getRefreshExp = () => {
    return localStorage.getItem('refreshToken') ? getTokenData(localStorage.getItem('refreshToken')).exp : null
}

const initialState = {
    signUp: false,
    signIn: false,
    user: getTokenData(localStorage.getItem('accessToken')),
    refreshExp: getRefreshExp()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case'SIGN_IN_CLICK':
            return {
                ...state,
                signIn: true,
            }
        case'SIGN_UP_CLICK':
            return {
                ...state,
                signUp: true
            }
        case'SIGN_IN_BACK_CLICK':
            return {
                ...state,
                signIn: false
            }
        case'SIGN_UP_BACK_CLICK':
            return {
                ...state,
                signUp: false
            }
        case 'LOGIN':
            return {
                ...state,
                user: getTokenData(localStorage.getItem('accessToken')),
                refreshExp: getRefreshExp()
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                refreshExp: null
            }
        default:
            return state
    }
}

export default reducer;