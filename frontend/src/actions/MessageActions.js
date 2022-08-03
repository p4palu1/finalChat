import * as api from "../api"

export const getMessages = (groupid) => async(dispatch) => {
    
    try{
        const { data } = await api.fetchMessages(groupid)
        dispatch({type: 'FETCH_ALL', payload: data}) 
    } catch (err) {
        console.log(err.message)
    }
    
}

export const sendMessage = (message) => async(dispatch) => {
    try{
        await api.sendMessage(message)
        dispatch({type: 'SEND_MESSAGE'})
    }
    catch (err) {
        console.log(err.message)
    }
}