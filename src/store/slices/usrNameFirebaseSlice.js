import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
export const usrNameFirebaseRequest = createAsyncThunk(
  "usrNameFireBase/usrNameFirebaseRequest",
  async () => {
    try {
      const database = getDatabase();
      const nameRef = ref(database, "Name/name");
      const nameSnapshot = await get(nameRef);
      if (nameSnapshot.exists()) {
        return nameSnapshot.val();
      } else {
        throw new Error("No name data available");
      }
    } catch (error) {
      console.log("Error fetching user name:", error.message);
      throw error;
    }
  }
);

const usrNameFirebaseSlice = createSlice({
  name: "usrNameFireBase",

  initialState: {
    usrName: null,
    status: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(usrNameFirebaseRequest.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(usrNameFirebaseRequest.fulfilled, (state, action) => {
        state.status = "success";
        state.usrName = action.payload;
      })
      .addCase(usrNameFirebaseRequest.rejected, (state) => {
        state.status = "success";
      });
  },
});

export default usrNameFirebaseSlice.reducer;
