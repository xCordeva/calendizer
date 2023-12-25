"use client";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/css/theCalendar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openEventPopup } from "@/features/EventPopup";
import useFetchEvents from "@/Custom Hooks/useFetchEvents";
import { openEditEvent } from "@/features/EditEvent";
import CustomEventWrapper from "./CustomEventWrapper";
import EventHoverDetails from "./EventHoverDetails";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalendar() {
  const dispatch = useDispatch();

  const handleEventSelect = (event) => {
    const { start, end, timestamp, ...otherProps } = event;
    // Reformat start, end and timestamp
    const formattedStart = new Date(start).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedEnd = new Date(end).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedTimestamp = new Date(
      event.timestamp.toDate()
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const updatedEvent = {
      ...otherProps,
      start: formattedStart,
      end: formattedEnd,
      timestamp: formattedTimestamp,
    };

    // Dispatch the action with the updated event
    dispatch(openEditEvent(updatedEvent));
  };

  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state) => state.RefetchEvents.value);

  //the dates are not stored in the right form so had to make it into the right form before providing
  let { events } = useFetchEvents();
  events = events.map((event) => ({
    ...event,
    start: event.start.toDate(),
    end: event.end.toDate(),
  }));

  const eventPopupClicked = useSelector((state) => state.EventPopup.value);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDayClick = (event) => {
    const { start, end } = event;

    const formattedDate = new Date(start).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    // the states are revered the false means it will open the popup
    dispatch(openEventPopup(formattedDate));
  };

  const components = {
    eventWrapper: CustomEventWrapper, // Use the custom event wrapper
  };

  const hoverdEventData = useSelector((state) => state.HoverEvent.value);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseOut = () => {
    console.log(`updatedEvent`);
  };
  return (
    <div className="the-calendar" onMouseMove={handleMouseMove}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000 }}
        selectable={true}
        onSelectSlot={handleDayClick}
        onSelectEvent={handleEventSelect}
        // components={{
        //   eventWrapper: (props) => <CustomEventWrapper {...props} />,
        // }}
      />
      {/* <div className="hover-event">
        {hoverdEventData && <EventHoverDetails mousePosition={mousePosition} />}
      </div> */}
    </div>
  );
}
