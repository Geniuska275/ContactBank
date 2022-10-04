import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { beansReducer } from './beans/beansReducer';
import breadReducer from './breads/breadReducer';
import teaReducer from './tea/teaReducer';

const store=configureStore({
    reducer:{
        beans:beansReducer,
        breads:breadReducer,
        tea:teaReducer
    }
})
export default store