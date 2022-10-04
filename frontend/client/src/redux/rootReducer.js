import { combineReducers } from "redux";
import { beansReducer } from "./beans/beansReducer";
import breadReducer from "./breads/breadReducer";
import teaReducer from "./tea/teaReducer";

 const rootReducer=combineReducers({
    bread:breadReducer,
    beans:beansReducer,
    tea:teaReducer
})

export default rootReducer


