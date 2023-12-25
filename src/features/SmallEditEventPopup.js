import { createSlice } from "@reduxjs/toolkit";

const initialSmallEditEventPopupValue = null;
export const smallEditEventPopupSlice = createSlice({
  name: "smallEditEventPopup",
  initialState: { value: initialSmallEditEventPopupValue },
  reducers: {
    openSmallEditEventPopup: (state, action) => {
      state.value = action.payload;
    },
    closeSmallEditEventPopup: (state) => {
      state.value = initialSmallEditEventPopupValue;
    },
  },
});

export const { openSmallEditEventPopup, closeSmallEditEventPopup } =
  smallEditEventPopupSlice.actions;
export default smallEditEventPopupSlice.reducer;
