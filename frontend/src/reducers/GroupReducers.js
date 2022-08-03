export const reducer = (groups=[], action) => {
    switch(action.type){
        case 'FETCH_GROUPS':
            return action.payload
        case 'ADD_GROUP':
            return action.payload
        default:
            return groups
    }
}

export default reducer