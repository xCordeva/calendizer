"use client";
import TheCalendar from "@/components/TheCalendar";
import "@/css/calendarPage.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PleaseSignInMsg from "@/components/PleaseSignInMsg";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import PopupAddEvent from "@/components/PopupAddEvent";
import useAuth from "@/Custom Hooks/useAuth";
import { useSelector } from "react-redux";

export default function Calendar() {
  usePopupCloser();
  const ShowSignInMsg = useSelector((state) => state.ShowSignInMsg.value);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <img
          src="https://im2.ezgif.com/tmp/ezgif-2-e819725d06.gif"
          alt="calendar-loading-gif"
        />
      </div>
    );
  }
  return (
    <div className="calendar-page">
      <Navbar />
      <div className="calendar-page-contianer">
        {ShowSignInMsg && <PleaseSignInMsg />}
        <Sidebar />
        <TheCalendar />
        <PopupAddEvent />
      </div>
    </div>
  );
}
