import React, { useState } from "react";
import {
  faSquareCaretLeft,
  faSquareCaretRight,
  faTriangleExclamation,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchEvents from "@/Custom Hooks/useFetchEvents";
import ConfirmDelete from "./ConfirmDelete";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { triggerRefetch } from "@/features/RefetchEvents";
import { closeEditEvent } from "@/features/EditEvent";

export default function DayPlan() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return (v >= 11 && v <= 13) || !suffixes[v % 10] ? "th" : suffixes[v % 10];
  }
  // get today in the form of Day, Month numberTH.
  const formattedDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };
  // add the 1st, 2nd, 3rd ,th to the numbers
  const dayWithSuffix = formattedDate(currentDate).replace(/\d{1,2}/, (day) => {
    const numericDay = parseInt(day, 10);
    return `${numericDay}${getOrdinalSuffix(numericDay)}`;
  });

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDay);
  };
  let { events } = useFetchEvents();
  events = events.map((event) => ({
    ...event,
    start: event.start.toDate(),
    end: event.end.toDate(),
  }));

  const formatDateAndTime = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  };
  const formatDateOnly = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  // day plan logic

  const { addEvent, editEvent, deleteEvent } = useFetchEvents();
  const refetchEvents = useSelector((state) => state.RefetchEvents.value);
  const [confrimDelete, setConfrimDelete] = useState(null);
  const handleDeleteEvent = () => {
    deleteEvent(confrimDelete);
    dispatch(triggerRefetch(!refetchEvents));
    setConfrimDelete(null);
  };

  return (
    <div className="day-plan">
      <div className="day-header">
        <FontAwesomeIcon icon={faSquareCaretLeft} onClick={goToPreviousDay} />
        <h2>{dayWithSuffix}</h2>
        <FontAwesomeIcon icon={faSquareCaretRight} onClick={goToNextDay} />
      </div>
      <div className="day-body">
        {events.map((event) =>
          (event.start <= currentDate && currentDate <= event.end) ||
          (event.start.toLocaleDateString() <=
            currentDate.toLocaleDateString() &&
            currentDate.toLocaleDateString() <=
              event.end.toLocaleDateString()) ? (
            <div className="day-content" key={event.id}>
              <div className="day-content-header">
                <div className="day-event-time">
                  <h5>
                    {event.allDay
                      ? formatDateOnly(event.start)
                      : formatDateAndTime(event.start)}
                    &nbsp;-
                    <br />
                    {event.allDay
                      ? formatDateOnly(event.end)
                      : formatDateAndTime(event.end)}
                  </h5>
                </div>
                <div className="day-event-toolbox">
                  <FontAwesomeIcon icon={faPenToSquare} />

                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => setConfrimDelete(event.id)}
                  />
                </div>
              </div>
              <div className="day-title-priority">
                <h2>{event.title}</h2>
                {event.highPriority && (
                  <h5>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className="edit-icons"
                    />
                    High Priority
                  </h5>
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
      {confrimDelete && (
        <ConfirmDelete
          onCancel={() => setConfrimDelete(null)}
          onConfirm={handleDeleteEvent}
        />
      )}
    </div>
  );
}