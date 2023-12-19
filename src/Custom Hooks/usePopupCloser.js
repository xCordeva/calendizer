// usePopupHandling.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { closeUserPopup } from '../features/UserPopup';
import { closeNotificationPopup } from '@/features/NotificationPopup';
import { auth } from '../firebase/firebaseConfig';

const usePopupCloser = () => {

  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const userPopupOpen = useSelector((state) => state.UserPopup.value);
  const notificationPopupOpen = useSelector((state) => state.NotificationPopup.value);

  const handleBodyClick = (event) => {
    // check if the click is outside the popup
    if (userPopupOpen && !event.target.closest('.popup')) {
      dispatch(closeUserPopup(false));
    }
    if (notificationPopupOpen && !event.target.closest('.popup')) {
      dispatch(closeNotificationPopup(false));
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [userPopupOpen, notificationPopupOpen]);

};

export default usePopupCloser;
