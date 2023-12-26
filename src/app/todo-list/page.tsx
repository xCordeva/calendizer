"use client";
import "@/css/todoList.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import "@/css/global.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import TodoList from "@/components/TodoList";

export default function TodoListPage() {
  usePopupCloser();

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
