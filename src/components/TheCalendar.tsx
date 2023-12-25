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
import EventHoverDetails from "./EventHoverDetails";
import { openSmallEditEventPopup } from "@/features/SmallEditEventPopup";

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

  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state) => state.RefetchEvents.value);

  //the dates are not stored in the right form so had to make it into the right form before providing
  let { events } = useFetchEvents();
  events = events.map((event) => ({
    ...event,
    start: event.start.toDate(),
    end: event.end.toDate(),
  }));

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

  const hoverdEventData = useSelector(
    (state) => state.SmallEditEventPopup.value
  );

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleEventClick = (event, e) => {
    const rect = e.target.getBoundingClientRect(); // Get the position of the clicked event
    //if the event has high Priority the popup will have an extra height so we increase the hegiht with 20px,
    const top = rect.top - 200 + (event.highPriority ? -20 : 0);

    const initialLeft = rect.left + rect.width / 2 - 150;

    // check if the initial left position overflows to the right
    const adjustedLeft =
      initialLeft + 300 > window.innerWidth
        ? window.innerWidth - 300
        : initialLeft;
    //if the top is less than 0 which means it overflows out of window make the top to be the bottom position of the rect
    const adjustedTop = top < 0 ? rect.bottom + 20 : top;

    setPopupPosition({ top: adjustedTop, left: adjustedLeft });

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
    dispatch(openSmallEditEventPopup(updatedEvent));
  };

  return (
    <div className="the-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "91dvh" }}
        selectable={true}
        onSelectSlot={handleDayClick}
        onSelectEvent={handleEventClick}
      />
      {hoverdEventData && <EventHoverDetails popupPosition={popupPosition} />}
    </div>
  );
}
