"use client";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const SignUp = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (user) {
    router.push("/");
  }
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
        router.push("/");
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
      router.push("/");
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
          src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
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
