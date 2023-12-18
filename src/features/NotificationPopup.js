import { createSlice } from "@reduxjs/toolkit";

const initialNotificationStateValue = false;
export const notificationPopupSlice = createSlice({
    name: 'notificationPopup',
    initialState: { value: initialNotificationStateValue },
    reducers: {
        openNotificationPopup: (state, action) => {
            state.value = action.payload;
        },
        closeNotificationPopup: (state) => {
            state.value = initialNotificationStateValue;
        },
    },
});

export const { openNotificationPopup, closeNotificationPopup } = notificationPopupSlice.actions;
export default notificationPopupSlice.reducer;
