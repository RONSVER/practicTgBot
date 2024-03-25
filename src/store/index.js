import { configureStore } from "@reduxjs/toolkit";
import postMsgTgReducer from "./slices/postMsgTgSlice";
import getMsgTgReducer from "./slices/getMsgTgSlice";
import dataArchiveReducer from "./slices/dataArchiveSlice";
import postPhotoTgReducer from "./slices/postPhotoTgSlice";

const store = configureStore({
  reducer: {
    postMsgTg: postMsgTgReducer,
    getMsgTg: getMsgTgReducer,
    dataArchive: dataArchiveReducer,
    postPhotoTg: postPhotoTgReducer,
  },
});

export default store;
