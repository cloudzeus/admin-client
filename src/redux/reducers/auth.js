import { USER_LOGIN } from '../actions/auth'

const initialState = {
    auth : false,
    user : null
}



export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {...state,auth:true,user:action.payload}
        default:
            return state;
    }
};