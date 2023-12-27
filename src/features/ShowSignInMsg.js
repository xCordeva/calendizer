import { createSlice } from "@reduxjs/toolkit";

const initialShowSignInMsgStateValue = false;
export const showSignInMsgSlice = createSlice({
  name: "showSignInMsg",
  initialState: { value: initialShowSignInMsgStateValue },
  reducers: {
    openShowSignInMsg: (state, action) => {
      state.value = action.payload;
    },
    closeShowSignInMsg: (state) => {
      state.value = initialShowSignInMsgStateValue;
    },
  },
});

export const { openShowSignInMsg, closeShowSignInMsg } =
  showSignInMsgSlice.actions;
export default showSignInMsgSlice.reducer;
