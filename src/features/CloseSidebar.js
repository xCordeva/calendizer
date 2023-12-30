import { createSlice } from "@reduxjs/toolkit";

const initialCloseSidebarValue = false;
export const closeSidebarSlice = createSlice({
  name: "closeSidebar",
  initialState: { value: initialCloseSidebarValue },
  reducers: {
    closeSidebar: (state, action) => {
      state.value = action.payload;
    },
    openSidebar: (state) => {
      state.value = initialCloseSidebarValue;
    },
  },
});

export const { openSidebar, closeSidebar } = closeSidebarSlice.actions;
export default closeSidebarSlice.reducer;
