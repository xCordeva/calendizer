import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/css/sidebar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeSidebar } from "@/features/CloseSidebar";
import { useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth <= 975) {
      dispatch(closeSidebar(false));
    }
  }, []);

  const isSidebarOpen = useSelector((state) => state.CloseSidebar.value);
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""} `}>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Dashboard
      </Link>
      <Link
        href="/calendar"
        className={pathname === "/calendar" ? "active" : ""}
      >
        Calendar
      </Link>
      <Link
        href="/todo-list"
        className={pathname === "/todo-list" ? "active" : ""}
      >
        Todo List
      </Link>
    </div>
  );
}
