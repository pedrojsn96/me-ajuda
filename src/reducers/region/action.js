export const changeReduxState = (state) =>{
    return{
        type:'CHANGE_STATE',
        payload:state
    }
}

export const changeReduxCity = (city) =>{
    return{
        type:'CHANGE_CITY',
        payload:city
    }
}