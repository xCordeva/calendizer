import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { closeUserPopup } from "../features/UserPopup";
import { useRouter } from "next/navigation";
import useAuth from "@/Custom Hooks/useAuth";

export default function PopupUser() {
  const dispatch = useDispatch();
  const [signOut] = useSignOut(auth);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      // close popup after sign out
      dispatch(closeUserPopup(false));
      // send user to sign in page after sign out
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const { user } = useAuth();

  return (
    <div className="popup">
      <div className="popup-user">
        <h4>{user && user.displayName}</h4>
        <hr />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}
