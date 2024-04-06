import { configureStore } from "@reduxjs/toolkit";
import usrNameFirebaseReducer from "./slices/usrNameFirebaseSlice";
import usrDateFirebaseReducer from "./slices/usrDateFirebaseSlice";

const store = configureStore({
  reducer: {
    usrNameFirebase: usrNameFirebaseReducer,
    usrDateFirebase: usrDateFirebaseReducer,
  },
});

export default store;
