const signInClicked = () => {
    return {
        type: 'SIGN_IN_CLICK',
    }
}

const signInBack = () => {
    return {
        type: 'SIGN_IN_BACK_CLICK',
    }
}
const signUpClicked = () => {
    return {
        type: 'SIGN_UP_CLICK',
    }
}

const signUpBack = () => {
    return {
        type: 'SIGN_UP_BACK_CLICK',
    }
}

const tokenLoaded = () => {
    return {
        type: 'LOGIN',
    }
}

const signOut = () => {
    return {
        type: 'LOGOUT'
    }
}

export {
    signInClicked,
    signInBack,
    signUpClicked,
    signUpBack,
    tokenLoaded,
    signOut
};