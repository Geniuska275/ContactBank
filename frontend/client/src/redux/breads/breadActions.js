// Action creator
import { BUY_BREAD } from "./breadTypes"
import { ADD_BREAD } from "./addBreadtype"


 export const buyBread=(sell)=>{
    return{
        type:BUY_BREAD,
        payload:sell
    }
}

export const addBread=(add)=>{
    return{
        type:ADD_BREAD,
        payload:+add
    }
}

