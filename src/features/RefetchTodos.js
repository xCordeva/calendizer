import { createSlice } from "@reduxjs/toolkit";

const initialrefetchTodosStateValue = false;
export const refetchTodosSlice = createSlice({
  name: "refetchTodos",
  initialState: { value: initialrefetchTodosStateValue },
  reducers: {
    triggerRefetch: (state, action) => {
      state.value = action.payload;
    },
    refetchTodosState: (state) => {
      state.value = initialrefetchTodosStateValue;
    },
  },
});

export const { triggerRefetch, refetchTodosState } = refetchTodosSlice.actions;
export default refetchTodosSlice.reducer;
