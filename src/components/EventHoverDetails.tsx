import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faClock,
  faTriangleExclamation,
  faCalendar,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { openEditEvent } from "@/features/EditEvent";
import { closeSmallEditEventPopup } from "@/features/SmallEditEventPopup";
import useFetchEvents from "@/Custom Hooks/useFetchEvents";
import { triggerRefetch } from "@/features/RefetchEvents";
import ConfirmDelete from "./ConfirmDelete";

export default function EventHoverDetails({ popupPosition }) {
  const dispatch = useDispatch();
  const hoverDivRef = useRef(null);
  const clickedEventData = useSelector(
    (state) => state.SmallEditEventPopup.value
  );

  const { start, end, timestamp, ...others } = clickedEventData;

  let formattedStart = start;
  let formattedEnd = end;

  if (clickedEventData.allDay) {
    formattedStart = new Date(start).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    formattedEnd = new Date(end).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const formattedTimestamp = new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const updatedEvent = {
    ...others,
    start: formattedStart,
    end: formattedEnd,
    timestamp: formattedTimestamp,
  };

  useEffect(() => {
    // Check if the ref is not null before accessing its properties
    if (hoverDivRef.current) {
      hoverDivRef.current.style.top = popupPosition.top + "px";
      hoverDivRef.current.style.left = popupPosition.left + "px";
    }
  }, [popupPosition]);

  const handleEventSelect = () => {
    // Dispatch the action with the updated event
    dispatch(openEditEvent(updatedEvent));
    dispatch(closeSmallEditEventPopup());
  };

  const refetchEvents = useSelector((state) => state.RefetchEvents.value);

  const { deleteEvent } = useFetchEvents();

  const handleDeleteEvent = () => {
    if (clickedEventData) {
      console.log(clickedEventData.id);
      deleteEvent(clickedEventData.id);
      dispatch(triggerRefetch(!refetchEvents));
      dispatch(closeSmallEditEventPopup());
      toggleConfrimDelete();
    }
  };

  const [confrimDelete, setConfrimDelete] = useState(false);
  const toggleConfrimDelete = () => {
    setConfrimDelete(!confrimDelete);
  };
  return (
    <div>
      {confrimDelete && (
        <ConfirmDelete
          onCancel={toggleConfrimDelete}
          onConfirm={handleDeleteEvent}
        />
      )}

      <div ref={hoverDivRef} className="edit-event-popup popup">
        <FontAwesomeIcon
          icon={faXmark}
          className="close-icon"
          onClick={() => {
            dispatch(closeSmallEditEventPopup());
          }}
        />
        <div className="edit-event-popup-buttons">
          <button
            onClick={handleEventSelect}
            className="events-button edit-button"
          >
            Edit
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className="events-button delete-button"
            onClick={toggleConfrimDelete}
          >
            Delete
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <h3>{updatedEvent.title}</h3>
        <p>
          {updatedEvent.highPriority ? (
            <>
              {
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "red" }}
                  className="edit-icons"
                />
              }
              <strong>High Priority</strong>
            </>
          ) : (
            ""
          )}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faClock}
            style={{ color: "#33b864" }}
            className="edit-icons"
          />
          {updatedEvent.start}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faClock}
            style={{ color: "#ff003f" }}
            className="edit-icons"
          />
          {updatedEvent.end}
        </p>

        <p>
          <FontAwesomeIcon icon={faCalendar} className="edit-icons" />
          <strong>Created At:</strong> {updatedEvent.timestamp}
        </p>
      </div>
    </div>
  );
}
