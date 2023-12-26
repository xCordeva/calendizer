"use client";
import TheCalendar from "@/components/TheCalendar";
import "@/css/calendarPage.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import PopupAddEvent from "@/components/PopupAddEvent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import Loading from "../../../public/loading.gif";

export default function Calendar() {
  usePopupCloser();
  const [user] = useAuthState(auth);
  if (!user) {
    return (
      <div className="loading">
        <img src="https://im2.ezgif.com/tmp/ezgif-2-e819725d06.gif" alt="" />
      </div>
    );
  }
  return (
    <div className="calendar-page">
      <Navbar />
      <div className="calendar-page-contianer">
        <Sidebar />
        <TheCalendar />
        <PopupAddEvent />
      </div>
    </div>
  );
}
