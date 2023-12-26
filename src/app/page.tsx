"use client";
import Navbar from "@/components/Navbar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import Sidebar from "@/components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function Home() {
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
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}
