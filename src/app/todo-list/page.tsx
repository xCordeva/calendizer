"use client";
import "@/css/todoList.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import TodoList from "@/components/TodoList";
import useAuth from "@/Custom Hooks/useAuth";
import PleaseSignInMsg from "@/components/PleaseSignInMsg";
import { useSelector } from "react-redux";

export default function TodoListPage() {
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
    <div className="todo-page">
      <Navbar />
      <div className="todo-page-contianer">
        {ShowSignInMsg && <PleaseSignInMsg />}
        <Sidebar />
        <TodoList />
      </div>
    </div>
  );
}
