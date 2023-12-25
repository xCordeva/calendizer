import { createSlice } from "@reduxjs/toolkit";

const initialHoverEventValue = null;
export const hoverEventSlice = createSlice({
  name: "hoverEvent",
  initialState: { value: initialHoverEventValue },
  reducers: {
    openHoverEvent: (state, action) => {
      state.value = action.payload;
    },
    closeHoverEvent: (state) => {
      state.value = initialHoverEventValue;
    },
  },
});

export const { openHoverEvent, closeHoverEvent } = hoverEventSlice.actions;
export default hoverEventSlice.reducer;
