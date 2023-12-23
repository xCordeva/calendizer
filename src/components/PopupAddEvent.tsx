'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTag, faMarker, faHourglassStart, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { parse } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { closeEventPopup } from '@/features/EventPopup';
import { useEffect, useState } from 'react';
import useFetchEvents from '@/Custom Hooks/useFetchEvents';
import "firebase/compat/firestore";
import { triggerRefetch } from '@/features/RefetchEvents'


export default function PopupAddEvent() {

  // getting the date from the click on the slot,using REDUX selector
  const eventPopupClicked = useSelector((state) => state.EventPopup.value);

  //setting a default time and date for the popup
  const defaultTime = parse('12:00 AM', 'h:mm a', new Date());
  const dispatch = useDispatch();

  const dafaultDate = new Date(eventPopupClicked);

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
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventStartDate, setNewEventStartDate] = useState(dafaultDate);
  const [newEventEndDate, setNewEventEndDate] = useState(dafaultDate);
  const [newEventStartTime, setNewEventStartTime] = useState(defaultTime);
  const [newEventEndTime, setNewEventEndTime] = useState(defaultTime);

  // since it waits for an event popup click to set a default date, it would be null at first so it sets a random date no 1970. using effect to trigger a set state when the click happens
  useEffect(() => {
    setNewEventStartDate(new Date(eventPopupClicked));
    setNewEventEndDate(new Date(eventPopupClicked));

  }, [eventPopupClicked]);



  //func to reset all states
  const resetForm = () => {
    setAllDay(true);
    setHighPriority(false);
    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventStartDate(dafaultDate);
    setNewEventEndDate(dafaultDate);
    setNewEventStartTime(defaultTime);
    setNewEventEndTime(defaultTime);
  };
  
  // a Redux state to refresh the fetch
  const refetchEvents = useSelector((state) => state.RefetchEvents.value)

  // destructring add event from the fetch events hook
  const { addEvent } = useFetchEvents()

  const addNewEvent = async (e) => {
    e.preventDefault();

    // merging date and time togther
    const mergedStartDate = new Date(newEventStartDate);
    mergedStartDate.setHours(newEventStartTime.getHours(), newEventStartTime.getMinutes());

    const mergedEndDate = new Date(newEventEndDate);
    mergedEndDate.setHours(newEventEndTime.getHours(), newEventEndTime.getMinutes());


    // Access the values from the state
    const newEventData = {
        title: newEventTitle,
        description: newEventDescription,
        start: mergedStartDate,
        end: mergedEndDate,
        allDay,
        highPriority,
        timestamp: new Date(),
    }
    await addEvent(newEventData);
    dispatch(closeEventPopup());

    // reset the states after saving
    resetForm()
    //a Redux action to refetch events when user adds new event
    dispatch(triggerRefetch(!refetchEvents))
  };

  // if user didnt click on any slot it returns null as the popup should not appear
  if (eventPopupClicked === null) {
    return null;
  }

  return (
    <div className={`popup-event `}>
      <div className="add-event">
        <form onSubmit={addNewEvent}>
            <FontAwesomeIcon
            icon={faXmark}
            className="close-icon"
            onClick={() => {
              dispatch(closeEventPopup());
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
                    defaultValue={dafaultDate}
                    onChange={(date) => setNewEventStartDate(date)}
                  />
                  {!allDay && (
                    <TimePicker
                      views={['hours', 'minutes']}
                      value={defaultTime}
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
                    defaultValue={dafaultDate}
                    onChange={(date) => setNewEventEndDate(date)}
                  />
                  {!allDay && (
                    <TimePicker
                      views={['hours', 'minutes']}
                      value={defaultTime}
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
          <button type="submit">
            Save
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </form>
      </div>
    </div>
  );
}
