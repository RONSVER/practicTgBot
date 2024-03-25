import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postPhotoTgRequest = createAsyncThunk(
  "postPhotoTg/postPhotoTgRequest",
  async (photoData, thunkAPI) => {
    const { botChatPhotoId, linkSend } = thunkAPI.getState.postPhotoTg;

    try {
      const response = await fetch(linkSend, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ chatPhotoId: botChatPhotoId, photo: photoData }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const postPhotoTgSlice = createSlice({
  name: "postPhotoTg",
  initialState: {
    botChatPhotoId: "1382205984",
    status: null,
    linkSend:
      "https://api.telegram.org/bot6619816335:AAGL870Yd5QaHKCpJcn3lPOs15vWi6CFbXA/sendPhoto",
  },
  reducers: {
    addBotChatPhotoId(state, action) {
      state.botChatPhotoId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postPhotoTgRequest.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(postPhotoTgRequest.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(postPhotoTgRequest.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postPhotoTgSlice.reducer;
export const { addBotChatPhotoId } = postPhotoTgSlice.actions;
