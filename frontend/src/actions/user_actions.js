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

const signUpCompleted = (data) => {
    return {
        type: 'SIGN_UP_COMPLETED',
        payload: data
    }
}

const signOut = () => {
    return {
        type: 'SIGN_OUT',
    }
}

export {
    signInClicked,
    signInBack,
    signUpClicked,
    signUpBack,
    tokenLoaded,
    signUpCompleted,
    signOut
};