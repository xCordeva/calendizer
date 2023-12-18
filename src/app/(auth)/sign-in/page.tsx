'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/firebaseConfig'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth'


const SignIn = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  if(user){
    router.push('/')
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);





  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const res = await signInWithEmailAndPassword(email, password);
        // sessionStorage.setItem('user', true)
        if(res.user.email){
          setEmail('');
          setPassword('');
          console.log('all good')
          router.push('/')
        }
        console.log(res)
    }catch(e){
        console.error(e)
    }
  };

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
          <button type="submit">Sign In</button>
          <Link href='/sign-up'>Sign up</Link>
        </form>
      </div>
  );
};

export default SignIn;