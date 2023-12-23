import { createSlice } from "@reduxjs/toolkit";

const initialEventStateValue = null;
export const eventPopupSlice = createSlice({
    name: 'eventPopup',
    initialState: { value: initialEventStateValue },
    reducers: {
        openEventPopup: (state, action) => {
            state.value = action.payload;
        },
        closeEventPopup: (state) => {
            state.value = initialEventStateValue;
        },
    },
});

export const { openEventPopup, closeEventPopup } = eventPopupSlice.actions;
export default eventPopupSlice.reducer;
