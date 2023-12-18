'use client'
import Navbar from '@/components/Navbar'
import  '../css/global.css'
import {auth} from '../firebase/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'
import {  useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { closeUserPopup } from '../features/UserPopup';
import { closeNotificationPopup } from '../features/NotificationPopup';



export default function App() {

  const [user] = useAuthState(auth)
  const router = useRouter()
  console.log({user})
  if(!user){
    console.log(`not signed in`)
  }

  const dispatch = useDispatch()
  const userPopupOpen = useSelector((state) => state.UserPopup.value)
  const notificationPopupOpen = useSelector((state) => state.NotificationPopup.value)

  const handleBodyClick = (event) => {
    // check if the click is outside the popup
    if (userPopupOpen && !event.target.closest('.popup')) {
      dispatch(closeUserPopup(false));
    }
    if (notificationPopupOpen && !event.target.closest('.popup')) {
      dispatch(closeNotificationPopup(false));
    }
  };
  // close popups if user clicked anywhere in page
  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [userPopupOpen, notificationPopupOpen]);

  return (
      <div>
        <Navbar/>
        <main>
          This is the Dashboard
        </main>
      </div>
  )
}
