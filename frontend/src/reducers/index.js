import { combineReducers } from "redux";
import messages from "./MessageReducers" 
import groups from "./GroupReducers" 
export default combineReducers({
    messages,
    groups,
})