'use client'
import Navbar from '@/components/Navbar'
import  '../css/global.css'
import {auth} from '../firebase/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'


export default function Home() {
  const [user] = useAuthState(auth)
  const router = useRouter()
  console.log({user})
  if(!user){
    console.log(`not signed in`)
  }
  return (
    <div>
      <Navbar/>
      <main>
        This is the Dashboard
      </main>
    </div>
  )
}
