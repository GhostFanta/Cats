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
export function userLogin(email, password, history) {
    return (dispatch, getState) => {
        login(email, password).then((res) => {
            const token = res.data.auth_token;
            dispatch(setToken(token));
            sessionStorage.setItem('token', token);
            history.push("/search")
        }).catch(e => {

        });
    }
}

export function userSignup(username, email, password, history) {
    return (dispatch) => {
        signup(username, email, password).then((res) => {
        });
    }
}

export function userLogout(history) {
    return (dispatch) => {
        dispatch(setToken(""));
        sessionStorage.setItem('token', "");
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
