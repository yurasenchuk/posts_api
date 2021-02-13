const initialState = {
    sign_up: false,
    sign_in: false,
    login: {
        logged: localStorage.getItem('logged') === 'true',
        username: localStorage.getItem('username'),
    },
};

const user_reducer = (state = initialState, action) => {
    switch (action.type) {
        case'SIGN_IN_CLICK':
            return {
                ...state,
                sign_in: true,
                login: {
                    logged: false,
                    username: ''
                }
            }
        case'SIGN_UP_CLICK':
            return {
                ...state,
                sign_up: true
            }
        case'SIGN_IN_BACK_CLICK':
            return {
                ...state,
                sign_in: false
            }
        case'SIGN_UP_BACK_CLICK':
            return {
                ...state,
                sign_up: false
            }
        case 'LOGIN':
            return {
                ...state,
                sign_in: false,
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
                users_profiles: [
                    ...state.users_profiles,
                    action.payload
                ],
                sign_up: false
            }
        default:
            return state
    }
}

export default user_reducer;