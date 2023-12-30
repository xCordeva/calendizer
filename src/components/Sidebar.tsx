import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/css/sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const pathname = usePathname();
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
