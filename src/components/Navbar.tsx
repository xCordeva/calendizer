import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { openUserPopup } from "@/features/UserPopup";
import PopupUser from "./PopupUser";
import PopupNotification from "./PopupNotification";
import { openNotificationPopup } from "@/features/NotificationPopup";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { closeSidebar } from "@/features/CloseSidebar";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();
  const userPopupClicked = useSelector((state) => state.UserPopup.value);
  const notificationPopupClicked = useSelector(
    (state) => state.NotificationPopup.value
  );
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    dispatch(closeSidebar(!isSidebarOpen));
  };
  const isSidebarOpen = useSelector((state) => state.CloseSidebar.value);
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className={`toggle-sidebar ${isSidebarOpen ? "open" : ""} `}>
          <FontAwesomeIcon icon={faAnglesRight} onClick={toggleSidebar} />
          <p>Close Sidebar</p>
        </div>
        <div className="logo">
          <Link href="/">
            <h1>
              Calend<span className="logo-colored-part">izer</span>
            </h1>
          </Link>
        </div>
        {user ? (
          <div className="notif-user">
            <FontAwesomeIcon
              icon={faBell}
              onClick={() => {
                dispatch(openNotificationPopup(true));
              }}
            />
            <FontAwesomeIcon
              icon={faUser}
              onClick={() => {
                dispatch(openUserPopup(true));
              }}
            />
          </div>
        ) : (
          <Link href="/sign-in" className="nav-signin">
            Sign In
          </Link>
        )}
      </div>
      {userPopupClicked && <PopupUser />}
      {notificationPopupClicked && <PopupNotification />}
    </div>
  );
}
