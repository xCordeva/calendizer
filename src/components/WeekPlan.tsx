import "@/css/WeekPlan.css";
import WeekTimeline from "@/components/Timeline";
import useFetchEvents from "@/Custom Hooks/useFetchEvents";

export default function WeekPlan() {
  function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = number % 100;
    return (v >= 11 && v <= 13) || !suffixes[v % 10] ? "th" : suffixes[v % 10];
  }
  // get today in the form of Day, Month numberTH.
  const formattedDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };
  // add the 1st, 2nd, 3rd ,th to the numbers
  const dayWithSuffix = formattedDate(new Date()).replace(/\d{1,2}/, (day) => {
    const numericDay = parseInt(day, 10);
    return `${numericDay}${getOrdinalSuffix(numericDay)}`;
  });
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);

  const futureDayWithSuffix = formattedDate(futureDate).replace(
    /\d{1,2}/,
    (day) => {
      const numericDay = parseInt(day, 10);
      return `${numericDay}${getOrdinalSuffix(numericDay)}`;
    }
  );

  let { events } = useFetchEvents();
  events = events.map((event) => ({
    ...event,
    start: event.start.toDate(),
    end: event.end.toDate(),
  }));
  // remove all events thats not in this week's period
  const filteredEvents = events.filter(
    (event) =>
      !(event.end < new Date() || event.start > futureDate) ||
      !(
        event.end.toLocaleDateString() < new Date().toLocaleDateString() &&
        event.start.toLocaleDateString() > futureDate.toLocaleDateString()
      )
  );
  // arrange the events based on the start date
  const sortedFilteredEvents = filteredEvents.sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );
  return (
    <div className="week-plan">
      <div className="week-header">
        <h3>
          {dayWithSuffix} - {futureDayWithSuffix}
        </h3>
      </div>
      <div className="timeline">
        <WeekTimeline filteredEvents={sortedFilteredEvents} />
      </div>
      {sortedFilteredEvents.length === 0 && (
        <p className="no-plans-week-msg">No plans for the Week.</p>
      )}
    </div>
  );
}
