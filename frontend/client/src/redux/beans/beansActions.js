import { BUY_BEANS } from "./beansType";
import { ADD_BEANS } from "./beansType";

export const buy_beans=(sell)=>{
    return{
        type:BUY_BEANS,
        payload:sell
    }
}
export const add_beans=(add)=>{
 return{
    type:ADD_BEANS,
    payload:+add
 }
}