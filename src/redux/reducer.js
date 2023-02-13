import { SET_TOKEN, SET_USER } from "./actions";

const initialState = {
    user:null,
    token:null,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_TOKEN:
            return{...state, token: action.payload}    
        default:
            return state;
    }
}

export default userReducer;