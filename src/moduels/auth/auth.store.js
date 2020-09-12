import {
    login,
    signup,
    me
} from "../../service";

// Actions
const setToken = (token) => {
    return {
        type: 'auth/TOKEN_SUCCESS',
        token
    }
};

const setUserInfo = (username, email) => {
    return {
        type: 'auth/USERINFO_SUCCESS',
        username,
        email
    }
};

// Thunks
export function userLogin(email, password) {
    return (dispatch) => {
        login(email, password).then((res) => {
            dispatch(setToken);
        });
    }
}

export function userSignup(username, email, password) {
    return (dispatch) => {
        signup(username, email, password).then((res) => {
        });
    }
}

// Reducer
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "auth/TOKEN_SUCCESS":
            return {
                ...state,
                token: action.token
            };
        case "auth/USERINFO_SUCCESS":
            return {
                ...state,
                username: action.username,
                email: action.email
            };
        default:
            return state;
    }
};

export default authReducer;
