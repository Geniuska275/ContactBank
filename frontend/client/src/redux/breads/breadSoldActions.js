import { BREAD_SOLD } from "./breadSoldType"

 export const buyBread=(sell)=>{
    return{
        type:BREAD_SOLD,
        payload:+sell
    }
}



