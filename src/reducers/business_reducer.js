
export default function (state={}, action){
    switch(action.type){
        case 'GET_BUSINESS':
            return{...state, businesses:action.payload}
        case 'GET_INDIVIDUAL_BUSINESS':
            return{...state, business:action.payload}
        default:
            return state
    }
}