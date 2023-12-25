import { useDispatch } from "react-redux";
import { closeHoverEvent, openHoverEvent } from "@/features/HoverEvent";

// Custom EventWrapper component to handle mouseover event
const CustomEventWrapper = (props) => {
  const { event, onMouseOut } = props;

  const dispatch = useDispatch();

  const handleMouseHover = () => {
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
    dispatch(openHoverEvent(updatedEvent));
  };

  const handleMouseOut = () => {
    console.log(`updatedEvent`);
  };

  return (
    <div
      className="custom-event-wrapper"
      onMouseEnter={handleMouseHover}
      // onMouseLeave={() => dispatch(closeHoverEvent())}
      onMouseLeave={() => console.log(`fklsdfkl`)}
    >
      {props.children}
    </div>
  );
};

export default CustomEventWrapper;
