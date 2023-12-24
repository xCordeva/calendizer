import { createSlice } from "@reduxjs/toolkit";

const initialEditEventValue = null;
export const editEventSlice = createSlice({
  name: "editEvent",
  initialState: { value: initialEditEventValue },
  reducers: {
    openEditEvent: (state, action) => {
      state.value = action.payload;
    },
    closeEditEvent: (state) => {
      state.value = initialEditEventValue;
    },
  },
});

export const { openEditEvent, closeEditEvent } = editEventSlice.actions;
export default editEventSlice.reducer;
