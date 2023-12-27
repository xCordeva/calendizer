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
          src="https://firebasestorage.googleapis.com/v0/b/calendizer-cd2df.appspot.com/o/loading.gif?alt=media&token=5e97938a-3fd6-4f11-b741-abb0cad86c7e"
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
