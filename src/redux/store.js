import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.slice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
