import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

export default function WeekTimeline({ filteredEvents }) {
  const formatDateOnly = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const formatDateOnlyShort = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Group events by date
  const groupedEvents = {};
  filteredEvents.forEach((event) => {
    const dateKey = event.start.toISOString().split("T")[0]; // Use ISO date as the key
    if (!groupedEvents[dateKey]) {
      groupedEvents[dateKey] = [];
    }
    groupedEvents[dateKey].push(event);
  });

  const groupedEventsArray = Object.values(groupedEvents);

  return (
    <Timeline position="alternate">
      {groupedEventsArray.map((eventsGroup, groupIndex) => (
        <TimelineItem key={groupIndex}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {eventsGroup.map((event, eventIndex) => (
              <div className="timeline-day" key={event.id}>
                {eventIndex === 0 && <div className="timeline-item"></div>}
                {eventIndex === 0 && (
                  <div className="timeline-time">
                    <h5>{formatDateOnly(event.start)}</h5>
                  </div>
                )}

                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-title-period">
                  {formatDateOnlyShort(event.start)} -{" "}
                  {formatDateOnlyShort(event.end)}
                </p>
                <hr />
              </div>
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
