"use client";
import Navbar from "@/components/Navbar";
import "@/css/global.css";
import "@/css/Dashboard.css";
import usePopupCloser from "@/Custom Hooks/usePopupCloser";
import Sidebar from "@/components/Sidebar";
import UncheckedTodo from "@/components/UncheckedTodo";
import useAuth from "@/Custom Hooks/useAuth";
import useFetchTodo from "@/Custom Hooks/useFetchTodo";
import "@/css/todoList.css";
import DayPlan from "@/components/DayPlan";

export default function Home() {
  const { todos } = useFetchTodo();
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
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          <div className="dashboard-box">
            <h1>To-Do List</h1>
            {todos.every((item) => item.done) && (
              <p>All clear you can rest now.</p>
            )}
            <div className="dashboard-unchecked-container">
              <UncheckedTodo />
            </div>
          </div>
          <div className="dashboard-box day-plan-box">
            <h1>Day Plan</h1>
            <div className="dashboard-day-container">
              <DayPlan />
            </div>
            {todos.every((item) => item.done) && <p>No plans for the day.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
