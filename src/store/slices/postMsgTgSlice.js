import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postMsgTgRequest = createAsyncThunk(
  "postMsgTg/postMsgTgRequest",
  async (msg, thunkAPI) => {
    const { linkSend, botChatId } = thunkAPI.getState().postMsgTg;
    try {
      const response = await fetch(linkSend, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ chat_id: botChatId, text: msg }),
      });

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

const postMsgTgSlice = createSlice({
  name: "postMsgTg",
  initialState: {
    botChatId: "1382205984",
    status: null,
    linkSend:
      "https://api.telegram.org/bot6619816335:AAGL870Yd5QaHKCpJcn3lPOs15vWi6CFbXA/sendMessage",
  },

  reducers: {
    addChatId(state, action) {
      state.botChatId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postMsgTgRequest.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(postMsgTgRequest.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(postMsgTgRequest.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postMsgTgSlice.reducer;
export const { addChatId } = postMsgTgSlice.actions;
