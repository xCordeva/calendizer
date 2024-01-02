"use client";
import { useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const SignIn = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is authenticated, push to home route
        router.push("/");
        console.log(authUser);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const [incorrect, setIncorrect] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.error(e);
      setIncorrect(true);
    }
  };

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // Update local storage when user changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className="sign-box">
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h5 className={incorrect ? `incorrect-signin` : ""}>
          Email or password is incorrect.
        </h5>
        <button type="submit">Sign In</button>
      </form>
      <button type="button" onClick={handleGoogleSignIn}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/calendizer-cd2df.appspot.com/o/google-icon-logo.svg?alt=media&token=556536e6-7afc-4f0d-b1e8-cb65f2330335"
          alt="google-icon"
        />
        Sign In with Google
      </button>
      <div className="switch">
        Not registered?&nbsp;<Link href="/sign-up">Sign up</Link>
      </div>
    </div>
  );
};

export default SignIn;
