"use client";
import { useState, useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      // Check if res exists and has a user property
      if (res && res.user) {
        res.user.displayName = `${firstName} ${lastName}`;
        // Success: User signed up
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      } else {
        setIncorrect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const [incorrect, setIncorrect] = useState(false);

  return (
    <div className="sign-box">
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <div className="name-section">
          <input
            required
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
          pattern=".{6,}"
          title="Password must be at least 6 characters long"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h5 className={incorrect ? `incorrect-signup` : ""}>
          This email is already in use.
        </h5>
        <button type="submit">Sign up</button>
      </form>
      <button type="button" onClick={handleGoogleSignUp}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/calendizer-cd2df.appspot.com/o/google-icon-logo.svg?alt=media&token=556536e6-7afc-4f0d-b1e8-cb65f2330335"
          alt="google-icon"
        />
        Sign Up with Google
      </button>
      <div className="switch">
        Already have an account?&nbsp;<Link href="/sign-in"> Sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
