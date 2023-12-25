"use client";
import "@/css/todoList.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import TodoList from "@/components/TodoList";

export default function Calendar() {
  usePopupCloser();

  return (
    <div className="calendar-page">
      <Navbar />
      <div className="calendar-page-contianer">
        <Sidebar />
        <TodoList />
      </div>
    </div>
  );
}
