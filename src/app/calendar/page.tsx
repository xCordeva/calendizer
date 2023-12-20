'use client'
import TheCalendar from "@/components/TheCalendar"
import '@/css/calendarPage.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import  '@/css/global.css'
import usePopupCloser from '@/Custom Hooks/usePopupCloser'


export default function Calendar() {
  
  usePopupCloser()

  return (
    <div>
        <Navbar/>
        <div className="calendar-page-contianer">
          <Sidebar/>
          <TheCalendar/>
        </div>
      </div>
    
  )
}
