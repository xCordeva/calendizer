"use client"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '@/css/theCalendar.css'

const locales = {
  'en-US': enUS,
}

const events = [
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Big Meeting",
      start: new Date(2023, 11, 10),
      end: new Date(2023, 11, 10),
  },
  {
      title: "Vacation",
      start: new Date(2021, 6, 7),
      end: new Date(2021, 6, 10),
  },
  {
      title: "Conference",
      start: new Date(2021, 6, 20),
      end: new Date(2021, 6, 23),
  },
];
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const MyCalendar = (props) => (
  <div className='the-calendar'>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 1000 }}
    />
  </div>
)
export default MyCalendar;