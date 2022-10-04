import { BUY_BEANS } from "./beansType"
import { ADD_BEANS } from "./beansType"

const initialState={
    numOfBeans:100,
    numOfBeansSold:0,
    numOfBeansBought:0
}

export const beansReducer=(state=initialState,action)=>{
    switch(action.type){
        case BUY_BEANS:
            return{
                ...state,
                numOfBeans:state.numOfBeans - action.payload,
                numOfBeansSold:action.payload
            }
        case ADD_BEANS:
            return{
                ...state,
                numOfBeans:state.numOfBeans + action.payload,
                numOfBeansBought:action.payload
            }
        default:
            return state
    }
}