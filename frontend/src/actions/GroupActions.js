import * as api from "../api"

export const getGroups = () => async(dispatch) => {
    
    try{
        const { data } = await api.getGroups()
        dispatch({type: 'FETCH_GROUPS', payload: data}) 
    } catch (err) {
        console.log(err.message)
    }
    
}

export const addGroup = (group) => async(dispatch) => {
    try{
        await api.addGroup(group)
        dispatch({type: 'ADD_GROUP'})
    }
    catch (err) {
        console.log(err.message)
    }
}