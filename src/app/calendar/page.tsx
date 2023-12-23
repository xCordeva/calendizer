'use client'
import TheCalendar from "@/components/TheCalendar"
import '@/css/calendarPage.css'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import  '@/css/global.css'
import usePopupCloser from '@/Custom Hooks/usePopupCloser'
import PopupAddEvent from "@/components/PopupAddEvent"


export default function Calendar() {
  // const d = document.querySelector('.rbc-day-bg')
  usePopupCloser()

  return (
    <div className="calendar-page">
        <Navbar/>
        <div className="calendar-page-contianer">
          <Sidebar/>
          <TheCalendar/>
          <PopupAddEvent/>
        </div>
      </div>
    
  )
}
