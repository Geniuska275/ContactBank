import { BUY_TEA } from "./teatypes";
import { ADD_TEA } from "./teatypes";
export const buy_tea=(sell)=>{
    return{
        type:BUY_TEA,
        payload:sell
    }
}
export const add_tea=(add)=>{
    return{
        type:ADD_TEA,
        payload:+add
    }
}