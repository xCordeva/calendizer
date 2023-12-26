"use client";
import Navbar from "@/components/Navbar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/Custom Hooks/useAuth";

export default function Home() {
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
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}
