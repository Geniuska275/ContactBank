import {BUY_BREAD } from "./breadTypes"
import { ADD_BREAD } from "./addBreadtype"

const initialState={
    numOfBreads:160,
    numOfBreadsSold:0,
    numOfBreadsBought:0
}

const breadReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUY_BREAD:
            return{
                ...state,
                numOfBreads:state.numOfBreads - action.payload,
                numOfBreadsSold:action.payload
            }
        case ADD_BREAD:
            return{
                ...state,
                numOfBreads:state.numOfBreads + action.payload,
                numOfBreadsBought:action.payload
            }
        default :
        return state
    }


}

export default breadReducer