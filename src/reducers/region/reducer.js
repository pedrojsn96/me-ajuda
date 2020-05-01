const INITIAL_STATE = {
    state:"",
    city:""
}
export default function regionReducer(state = INITIAL_STATE, action){
    switch(action.type){
        case 'CHANGE_STATE':
            return {...state, state:action.payload}
        case 'CHANGE_CITY':
            return {...state, city:action.payload}
        default:
            return state
    }
}