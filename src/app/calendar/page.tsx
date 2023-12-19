'use client'
import TheCalendar from "../../components/TheCalendar"
import '../../css/TheCalendar.css'
import Navbar from '@/components/Navbar'
import  '@/css/global.css'
import usePopupCloser from '@/Custom Hooks/usePopupCloser'


export default function Calendar() {
  
  usePopupCloser()

  return (
    <div>
        <Navbar/>
        <TheCalendar/>
      </div>
    
  )
}
