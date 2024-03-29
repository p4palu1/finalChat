export const reducer = (posts=[], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload
        case 'SEND_MESSAGE':
            return action.payload
        default:
            return posts
    }
}

export default reducer