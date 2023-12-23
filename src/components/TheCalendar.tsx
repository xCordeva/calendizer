"use client"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import '@/css/theCalendar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openEventPopup } from '@/features/EventPopup'
import useFetchEvents from '@/Custom Hooks/useFetchEvents'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


export default function MyCalendar() {

  const dispatch = useDispatch()
  // thats the event selection use it for the hover effect later
  // const handleEventSelect = (event, e) => {
  //   console.log('Selected event:', event);
  //   // You can access the start and end dates from the event object
  //   // For example, event.start and event.end
  // };
  // onSelectEvent={handleEventSelect}


  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state)=> state.RefetchEvents.value)

  //the dates are not stored in the right form so had to make it into the right form before providing
  let { events } = useFetchEvents(); 
  events = events.map((event) => ({
    ...event,
    start: event.start.toDate(),
    end: event.end.toDate(),
  }))


  const eventPopupClicked = useSelector((state) => state.EventPopup.value)


  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (event) => {

    const { start, end } = event;

    const formattedDate = new Date(start).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    // the states are revered the false means it will open the popup
    dispatch(
      openEventPopup(formattedDate)
      )
  };


  return (
    <div className='the-calendar'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000 }}
        selectable={true}
        onSelectSlot={handleDayClick}
      />
    </div>
  );
}