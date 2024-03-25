import { createSlice } from "@reduxjs/toolkit";

const dataArchiveSlice = createSlice({
  name: "dataArchive",
  initialState: {
    usrName: null,
    usrDateOfBirth: null,
    usrPhoto: null,
  },

  reducers: {
    addUsrName(state, action) {
      state.usrName = action.payload;
      console.log(state.usrName);
    },

    addUsrDateOfBirth(state, action) {
      state.usrDateOfBirth = action.payload;
    },

    addUsrPhoto(state, action) {
      state.usrPhoto = action.payload;
    },
  },
});

export const { addUsrName, addUsrDateOfBirth, addUsrPhoto } =
  dataArchiveSlice.actions;

export default dataArchiveSlice.reducer;
