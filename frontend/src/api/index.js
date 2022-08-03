import axios from "axios" 

const url = "http://localhost:5000/"

export const fetchMessages = (groupid) => axios.get(`${url}messages/${groupid}`)
export const sendMessage = (message) => axios.post(url, message)
export const getGroups = () => axios.get(`${url}groups`)
export const addGroup = (group) => axios.get(`${url}groups`, group)