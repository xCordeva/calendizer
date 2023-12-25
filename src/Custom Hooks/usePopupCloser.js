// usePopupHandling.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { closeUserPopup } from "../features/UserPopup";
import { closeNotificationPopup } from "@/features/NotificationPopup";
import { auth } from "../firebase/firebaseConfig";
import { closeSmallEditEventPopup } from "@/features/SmallEditEventPopup";
import { closeEditEvent } from "@/features/EditEvent";
import { closeEventPopup } from "@/features/EventPopup";

const usePopupCloser = () => {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const userPopupOpen = useSelector((state) => state.UserPopup.value);
  const notificationPopupOpen = useSelector(
    (state) => state.NotificationPopup.value
  );
  const smallEditEventPopup = useSelector(
    (state) => state.SmallEditEventPopup.value
  );

  const handleBodyClick = (event) => {
    // check if the click is outside the popup
    if (userPopupOpen && !event.target.closest(".popup")) {
      dispatch(closeUserPopup(false));
    }
    if (notificationPopupOpen && !event.target.closest(".popup")) {
      dispatch(closeNotificationPopup(false));
    }
    if (
      smallEditEventPopup &&
      !event.target.closest(".popup") &&
      !event.target.closest(".confrim-delete")
    ) {
      dispatch(closeSmallEditEventPopup());
    }
  };

  const handleKeyDown = (event) => {
    // Check if the pressed key is the Esc key
    if (event.key === "Escape") {
      dispatch(closeUserPopup(false));
      dispatch(closeNotificationPopup(false));
      dispatch(closeSmallEditEventPopup());
      dispatch(closeEditEvent());
      dispatch(closeEventPopup());
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [userPopupOpen, notificationPopupOpen, smallEditEventPopup]);
};

export default usePopupCloser;
