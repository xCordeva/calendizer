'use client'
import { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/firebaseConfig'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        const res = await createUserWithEmailAndPassword(email, password)

        res.user.displayName = `${firstName} ${lastName}`;


        
        setEmail('');
        setPassword('')
        setFirstName('');
        setLastName('')

        console.log(res)

        if(res.status === 200){
          console.log('all good')
          router.push('/sign-in')
        }
    } catch(e){
        console.error(e)
    }
  };

  return (
    <div  className="sign-box">
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <div className='name-section'>
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
        <Link href='/sign-in'>Sign in</Link>
      </form>
    </div>
  );
};

export default SignUp;