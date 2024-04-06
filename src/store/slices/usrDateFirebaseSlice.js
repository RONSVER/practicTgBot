import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

export const usrDateFirebaseRequest = createAsyncThunk(
  "usrDateFirebase/usrDateFirebaseRequest",
  async () => {
    try {
      const database = getDatabase();
      const dateRef = ref(database, "DateOfBirth/dateOfBirth");
      const dateSnapshot = await get(dateRef);

      if (dateSnapshot.exists()) {
        return dateSnapshot.val();
      } else {
        throw new Error("No name data available");
      }
    } catch (error) {
      console.log("Error fetching user name:", error.message);
      throw error;
    }
  }
);

const usrDateFirebaseSlice = createSlice({
  name: "usrDateFirebase",

  initialState: {
    usrDate: null,
    status: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(usrDateFirebaseRequest.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(usrDateFirebaseRequest.fulfilled, (state, action) => {
        state.status = "success";
        state.usrDate = action.payload;
      })
      .addCase(usrDateFirebaseRequest.rejected, (state) => {
        state.status = "success";
      });
  },
});

export default usrDateFirebaseSlice.reducer;
