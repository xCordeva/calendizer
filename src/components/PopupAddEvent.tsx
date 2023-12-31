"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTag,
  faMarker,
  faHourglassStart,
  faFloppyDisk,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { parse } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { closeEventPopup } from "@/features/EventPopup";
import { closeEditEvent } from "@/features/EditEvent";
import { useEffect, useState } from "react";
import useFetchEvents from "@/Custom Hooks/useFetchEvents";
import "firebase/compat/firestore";
import { triggerRefetch } from "@/features/RefetchEvents";
import ConfirmDelete from "./ConfirmDelete";
import "@/css/PopupAdd-EditEvent.css";

export default function PopupAddEvent() {
  // Function to enable/disable scrolling
  function toggleScrollLock() {
    document.body.classList.toggle("scroll-lock");
  }
  // getting the date from the click on the slot,using REDUX selector
  const eventPopupClicked = useSelector((state) => state.EventPopup.value);

  // getting the date from the click on the slot,using REDUX selector
  const editEventClicked = useSelector((state) => state.EditEvent.value);
  //setting a default time and date for the popup
  let defaultStartTime = parse("12:00 PM", "h:mm a", new Date());
  let defaultEndTime = parse("01:00 PM", "h:mm a", new Date());

  const dispatch = useDispatch();

  let dafaultDateStart = new Date(eventPopupClicked);
  let dafaultDateEnd = new Date(eventPopupClicked);

  if (editEventClicked) {
    dafaultDateStart = new Date(editEventClicked.start);
    dafaultDateEnd = new Date(editEventClicked.end);
    // since it makes it 12Am the day dont show up on the calendar, so changing the time to 1Am so it would count the day user actually pick.
    //this only happens when we change the all day to false.
    if (editEventClicked.allDay) {
      dafaultDateEnd.setHours(1, 0, 0, 0);
    }
    defaultStartTime = dafaultDateStart;
    defaultEndTime = dafaultDateEnd;
  }
  // all day and high priority switches
  const [allDay, setAllDay] = useState(true);
  const toggleAllDaySwitch = () => {
    setAllDay(!allDay);
  };

  const [highPriority, setHighPriority] = useState(false);
  const toggleHighPrioritySwitch = () => {
    setHighPriority(!highPriority);
  };

  // all the form states
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventStartDate, setNewEventStartDate] = useState(dafaultDateStart);
  const [newEventEndDate, setNewEventEndDate] = useState(dafaultDateEnd);
  const [newEventStartTime, setNewEventStartTime] = useState(defaultStartTime);
  const [newEventEndTime, setNewEventEndTime] = useState(defaultEndTime);
  //show error when user choose time or date in the past of the choosen start date
  const [endTimeError, setEndTimeError] = useState(true);
  const toggleEndTimeErrorSwitch = () => {
    setEndTimeError(!endTimeError);
  };
  useEffect(() => {
    if (editEventClicked) {
      // If it's an edit event, set the state with edit event data
      setNewEventTitle(editEventClicked.title || ""); // You might need to adjust these based on your actual data structure
      setNewEventDescription(editEventClicked.description || "");
      setNewEventStartDate(
        new Date(editEventClicked.start) || dafaultDateStart
      );
      setNewEventEndDate(new Date(editEventClicked.end) || dafaultDateEnd);
      setNewEventStartTime(dafaultDateStart);
      setNewEventEndTime(dafaultDateEnd);
      setAllDay(editEventClicked.allDay);
      setHighPriority(editEventClicked.highPriority || false);
    } else {
      // If it's a new event, set the state with default values
      resetForm();
    }
  }, [editEventClicked]);

  // since it waits for an event popup click to set a default date, it would be null at first so it sets a random date no 1970. using effect to trigger a set state when the click happens
  useEffect(() => {
    setNewEventStartDate(new Date(eventPopupClicked));
    setNewEventEndDate(new Date(eventPopupClicked));
    if (editEventClicked) {
      setNewEventStartDate(new Date(editEventClicked.start));
      setNewEventEndDate(new Date(editEventClicked.end));
    }
  }, [eventPopupClicked, editEventClicked]);

  //func to reset all states
  const resetForm = () => {
    setAllDay(true);
    setHighPriority(false);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventStartDate(dafaultDateStart);
    setNewEventEndDate(dafaultDateEnd);
    setNewEventStartTime(defaultStartTime);
    setNewEventEndTime(defaultEndTime);
    setEndTimeError(false);
  };

  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state) => state.RefetchEvents.value);

  // destructring add event from the fetch events hook
  const { addEvent, editEvent, deleteEvent } = useFetchEvents();

  const addNewEvent = async (e) => {
    e.preventDefault();

    // merging date and time togther
    const mergedStartDate = new Date(newEventStartDate);
    mergedStartDate.setHours(
      newEventStartTime.getHours(),
      newEventStartTime.getMinutes()
    );

    const mergedEndDate = new Date(newEventEndDate);
    mergedEndDate.setHours(
      newEventEndTime.getHours(),
      newEventEndTime.getMinutes()
    );
    // check if the choosen end time or date is before the starting one, show popup if its
    if (mergedEndDate < mergedStartDate) {
      toggleEndTimeErrorSwitch();
      return;
    }

    // Access the values from the state
    const newEventData = {
      title: newEventTitle,
      description: newEventDescription,
      start: mergedStartDate,
      end: mergedEndDate,
      allDay,
      highPriority,
      timestamp: new Date(),
    };

    if (editEventClicked) {
      await editEvent(newEventData, editEventClicked.id);
    } else {
      await addEvent(newEventData);
    }
    dispatch(closeEventPopup());
    dispatch(closeEditEvent());
    // make scroll work
    document.body.classList.remove("scroll-lock");
    // reset the states after saving
    resetForm();
    //a Redux action to refetch events when user adds new event
    dispatch(triggerRefetch(!refetchEvents));
  };

  const handleDeleteEvent = () => {
    if (editEventClicked) {
      deleteEvent(editEventClicked.id);
      dispatch(triggerRefetch(!refetchEvents));
      resetForm();
      dispatch(closeEditEvent());
      toggleConfrimDelete();
    }
  };

  const [confrimDelete, setConfrimDelete] = useState(false);
  const toggleConfrimDelete = () => {
    setConfrimDelete(!confrimDelete);
  };

  // if user didnt click on any slot it returns null as the popup should not appear
  if (editEventClicked === null && eventPopupClicked === null) {
    return null;
  }

  return (
    <div className="popup-event">
      <div className="add-event">
        <form onSubmit={addNewEvent}>
          <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={() => {
              dispatch(closeEventPopup());
              dispatch(closeEditEvent());
              document.body.classList.remove("scroll-lock");
              resetForm();
            }}
          />
          <div className="label-container">
            <div className="label-icon">
              <FontAwesomeIcon icon={faTag} />
              <label>Title</label>
            </div>
            <input
              required
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
          </div>
          <div className="label-container">
            <div className="label-icon">
              <FontAwesomeIcon icon={faMarker} />
              <label>Description</label>
            </div>
            <textarea
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="label-container">
            <div className="label-icon">
              <FontAwesomeIcon icon={faHourglassStart} />
              <label>Time Period</label>
            </div>
            <div className="time-details">
              <label>From</label>
              <div className="date-time">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    defaultValue={dafaultDateStart}
                    onChange={(date) => setNewEventStartDate(date)}
                  />
                  {!allDay && (
                    <TimePicker
                      views={["hours", "minutes"]}
                      value={defaultStartTime}
                      onChange={(time) => setNewEventStartTime(time)}
                      className="choose-time"
                    />
                  )}
                </LocalizationProvider>
              </div>
            </div>
            <div className="time-details">
              <label>Till</label>
              <div className="date-time">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    defaultValue={dafaultDateEnd}
                    onChange={(date) => setNewEventEndDate(date)}
                  />
                  {!allDay && (
                    <TimePicker
                      views={["hours", "minutes"]}
                      value={defaultEndTime}
                      onChange={(time) => setNewEventEndTime(time)}
                      className="choose-time"
                    />
                  )}
                </LocalizationProvider>
              </div>
            </div>
            <div className="time-details">
              <label>All Day</label>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={allDay}
                    onChange={toggleAllDaySwitch}
                  />
                }
              />
            </div>
            <div className="time-details">
              <label>High Priority</label>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={highPriority}
                    onChange={toggleHighPrioritySwitch}
                  />
                }
              />
            </div>
          </div>
          <button className="events-button save-button" type="submit">
            Save
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </form>
        {editEventClicked && (
          <button
            className="events-button delete-button"
            type="button"
            onClick={toggleConfrimDelete}
          >
            Delete
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
        {confrimDelete && (
          <ConfirmDelete
            onCancel={toggleConfrimDelete}
            onConfirm={handleDeleteEvent}
          />
        )}

        {endTimeError && (
          <div className="error-message">
            <div className="error-message-popup">
              <p>End Time/Date must be after the starting Time/Date.</p>
              <button
                className="events-button"
                onClick={toggleEndTimeErrorSwitch}
              >
                okay
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
