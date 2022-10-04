import { configureStore } from "@reduxjs/toolkit";
import breadSoldReducer from "./breads/breadSoldReducer";

const soldstore = configureStore({
  reducer: {
    breadsold: breadSoldReducer,
  },
});
export default soldstore;
