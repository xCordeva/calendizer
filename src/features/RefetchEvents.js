import { createSlice } from "@reduxjs/toolkit";

const initialrefetchEventsStateValue = false;
export const refetchEventsSlice = createSlice({
    name: 'refetchEvents',
    initialState: { value: initialrefetchEventsStateValue },
    reducers: {
        triggerRefetch: (state, action) => {
            state.value = action.payload;
        },
        refetchEventsState: (state) => {
            state.value = initialrefetchEventsStateValue;
        },
    },
});

export const { triggerRefetch, refetchEventsState } = refetchEventsSlice.actions;
export default refetchEventsSlice.reducer;
