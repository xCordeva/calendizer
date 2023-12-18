'use client'
import  '../css/global.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit';
import UserPopupReducer from '../features/UserPopup'
import NotificationPopupReducer from '../features/NotificationPopup'
import { Provider } from 'react-redux';



const store = configureStore({
  reducer: {
    UserPopup: UserPopupReducer,
    NotificationPopup: NotificationPopupReducer,
  }
})



export default function Home() {
  
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
