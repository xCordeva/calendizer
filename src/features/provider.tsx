"use client"
import { configureStore } from '@reduxjs/toolkit';
import UserPopupReducer from '../features/UserPopup';
import NotificationPopupReducer from '../features/NotificationPopup';
import { Provider } from 'react-redux';


const store = configureStore({
    reducer: {
      UserPopup: UserPopupReducer,
      NotificationPopup: NotificationPopupReducer,
    },
});

export function ReduxProvider({children}){
    return <Provider store={store}>{children}</Provider>
}