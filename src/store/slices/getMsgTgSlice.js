import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMsgTgRequest = createAsyncThunk(
  "getMsgTg/getMsgTgRequest",
  async (_, thunkAPI) => {
    const { linkGet } = thunkAPI.getState().getMsgTg;
    try {
      const response = await fetch(linkGet);

      if (!response.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const getMsgTgSlice = createSlice({
  name: "getMsgTg",

  initialState: {
    listTg: [],
    status: null,
    linkGet:
      "https://api.telegram.org/bot6619816335:AAGL870Yd5QaHKCpJcn3lPOs15vWi6CFbXA/getUpdates",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getMsgTgRequest.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getMsgTgRequest.fulfilled, (state, action) => {
        state.status = "success";
        state.listTg = action.payload.result;
      })
      .addCase(getMsgTgRequest.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default getMsgTgSlice.reducer;
