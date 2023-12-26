"use client";
import "@/css/todoList.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import TodoList from "@/components/TodoList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function TodoListPage() {
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
    <div className="todo-page">
      <Navbar />
      <div className="todo-page-contianer">
        <Sidebar />
        <TodoList />
      </div>
    </div>
  );
}
