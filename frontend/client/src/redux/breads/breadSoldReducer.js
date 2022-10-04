import { BREAD_SOLD } from "../breads/breadSoldType"
const initialState={
    numOfBread:0
}

const breadSoldReducer=(state=initialState,action)=>{
    switch(action.type){
        case BREAD_SOLD:
            return{
                ...state,
                numOfBreads:state.numOfBreads +action.payload
            }
        
        default :
        return state
    }


}

export default breadSoldReducer