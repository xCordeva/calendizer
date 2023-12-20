// pages/index.js
'use client'
import Navbar from '@/components/Navbar';
import  '@/css/global.css'
import usePopupCloser from '@/Custom Hooks/usePopupCloser'
import Sidebar from '@/components/Sidebar'

export default function Home() {

  usePopupCloser()

  return (
    <div>
      <Navbar/>
      <Sidebar/>
    </div>
  );
}
