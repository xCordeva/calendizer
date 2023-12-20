'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth'
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

  const [incorrect, setIncorrect] = useState(false)



  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const res = await signInWithEmailAndPassword(email, password);
        localStorage.setItem('user', JSON.stringify(user))
        if(user.email){
          setEmail('');
          setPassword('');
          console.log('all good')
          router.push('/')
        }
        console.log(res)
    }catch(e){
        console.error(e)
        setIncorrect(true)
    }
  };

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      if(user?.email){
        setEmail('');
        setPassword('');
        console.log('all good')
        router.push('/')
      }
      console.log({user})
      router.push('/');
    } catch (error) {
      console.error(error);
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
          <h5 className={incorrect ? `incorrect-signin` : ''}>Email or password is incorrect.</h5>
          <button type="submit">Sign In</button>

        </form>
        <button type="button" onClick={handleGoogleSignIn}><img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="google-icon" />Sign In with Google</button>
        <div className='switch'>
          Not registered?&nbsp;<Link href='/sign-up'>Sign up</Link>
        </div>
      </div>
  );
};

export default SignIn;