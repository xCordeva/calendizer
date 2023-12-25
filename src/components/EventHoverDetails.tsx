import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function EventHoverDetails({ mousePosition }) {
  const hoverDivRef = useRef(null);
  const hoveredEventData = useSelector((state) => state.HoverEvent.value);

  const { start, end, timestamp, ...others } = hoveredEventData;

  let formattedStart = start;
  let formattedEnd = end;

  if (hoveredEventData.allDay) {
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
      const top = mousePosition.y + 10;
      const left = mousePosition.x + 10;

      hoverDivRef.current.style.top = top - 1050 + "px";
      hoverDivRef.current.style.left = left - 300 + "px";
    }
  }, [mousePosition]);

  return (
    <div ref={hoverDivRef} className="hover-event">
      <h3>{updatedEvent.title}</h3>
      <p>{updatedEvent.description}</p>
      <p>{updatedEvent.start}</p>
      <p>{updatedEvent.end}</p>
      <p>{updatedEvent.highPriority}</p>
      <p>Created At: {updatedEvent.timestamp}</p>
    </div>
  );
}
