import UserCard from "./components/UserCard";
import EventCard from "./components/EventCard";
import RSVPBadge from "./components/RSVPBadge";
import type { User, Event, RSVP } from "./types/index";

const student: User = {
  id: "USER-002",
  name: "Zurinee Belo",
  email: "zurineeirish@gmail.com",
  role: "attendee",
  isActive: true,
}

const event: Event = {
  id: "EVENT-002",
  title: "Tech Conference 2026",
  venue: "Mabini Auditorium",
  date: new Date("2026-07-18"),
};

const rsvp: RSVP = {
  id: "RSVP-002",
  userId: "USER-002",
  eventId: "EVENT-002",
  status: "pending",
  submittedAt: new Date(),
}

function App() {
  return (
    <div className="app">
      <UserCard
        user={student}
        onSelect={(u) => console.log(u)}
      />
      <EventCard event={event} />
      <RSVPBadge rsvp={rsvp}>
        <p>On time!</p>
      </RSVPBadge>

      <button
        type="button"
        onClick={() => console.log("Button clicked")}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
