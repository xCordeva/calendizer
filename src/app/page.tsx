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
          src="https://firebasestorage.googleapis.com/v0/b/calendizer-cd2df.appspot.com/o/loading.gif?alt=media&token=5e97938a-3fd6-4f11-b741-abb0cad86c7e"
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
