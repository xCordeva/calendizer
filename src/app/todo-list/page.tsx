"use client";
import "@/css/todoList.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import TodoList from "@/components/TodoList";
import useAuth from "@/Custom Hooks/useAuth";

export default function TodoListPage() {
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
    <div className="todo-page">
      <Navbar />
      <div className="todo-page-contianer">
        <Sidebar />
        <TodoList />
      </div>
    </div>
  );
}
