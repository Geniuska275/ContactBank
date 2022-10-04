import { BUY_TEA } from "./teatypes";
import { ADD_TEA } from "./teatypes";

const initialState={
    numOfTea:30,
    numOfTeaSold:0,
    numOfTeaBought:0
}

const teaReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUY_TEA:
            return{
                ...state,
                numOfTea:state.numOfTea - action.payload,
                numOfTeaSold:action.payload
            }
        case ADD_TEA:
            return{
                ...state,
                numOfTea:state.numOfTea + action.payload,
                numOfTeaBought:action.payload
            }
        default :
        return state
    } 
}
export default teaReducer