"use client";
import TheCalendar from "@/components/TheCalendar";
import "@/css/calendarPage.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import PopupAddEvent from "@/components/PopupAddEvent";
import useAuth from "@/Custom Hooks/useAuth";

export default function Calendar() {
  usePopupCloser();
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
        <Sidebar />
        <TheCalendar />
        <PopupAddEvent />
      </div>
    </div>
  );
}
