const initialState = {
    signUp: false,
    signIn: false,
    login: {
        logged: localStorage.getItem('logged') === 'true',
        username: localStorage.getItem('username'),
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case'SIGN_IN_CLICK':
            return {
                ...state,
                signIn: true,
                login: {
                    logged: false,
                    username: ''
                }
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
                signIn: false,
                login: {
                    ...state.login,
                    logged: localStorage.getItem('logged') === 'true',
                    username: localStorage.getItem('username'),
                }
            }
        case 'SIGN_OUT':
            return {
                ...state,
                login: {
                    logged: false,
                    username: ''
                }
            }
        case 'SIGN_UP_COMPLETED':
            return {
                ...state,
                usersProfiles: [
                    ...state.usersProfiles,
                    action.payload
                ],
                signUp: false
            }
        default:
            return state
    }
}

export default userReducer;