import { useState, useEffect, useRef } from "react";
import type { User, Event, RSVP } from "./types/index";
import UserCard from "./components/UserCard";
import EventCard from "./components/EventCard";
import RSVPBadge from "./components/RSVPBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    const mockStudent: User[] = [{
      id: "USER-002",
      name: "Zurinee Belo",
      email: "zurineeirish@gmail.com",
      role: "attendee",
      isActive: true,
    }];

    const mockEvent: Event[] = [
      {
        id: "EVENT-002",
        title: "Tech Conference 2026",
        venue: "Mabini Auditorium",
        date: new Date("2026-07-18"),
      },
      {
        id: "EVENT-003",
        title: "Org Seminar",
        venue: "Diokno Auditorium",
        date: new Date("2027-07-18"),
      }
    ];

    const mockRSVP: RSVP[] = [{
      id: "RSVP-002",
      userId: "USER-002",
      eventId: "EVENT-002",
      status: "pending",
      submittedAt: new Date(),
    }];

      setEvents(mockEvent);
      setSelectedUser(mockStudent[0]);
      setRsvps(mockRSVP);
      setIsLoading(false);
    }, []);

    const handleSearchChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setSearchTerm(e.target.value);
    };

    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
      return <p>Loading events...</p>;
    }

    return (
      <div className="app">
        <input ref={searchInputRef} value={searchTerm}
          type="text"
          placeholder="Search events..."
          onChange={handleSearchChange} />
        {previousSearch !== undefined && previousSearch !== searchTerm && <p>Previous search: "{previousSearch}"</p>}
        {selectedUser && (
          <UserCard
            user={selectedUser}
            onSelect={setSelectedUser}
          />
        )}
        {selectedUser && <p>Selected: {selectedUser.name}</p>}
        <button onClick={toggleDetails}>{showDetails ? "Hide" : "Show"} Details</button>
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }

export default App;

/* Add useState<T> for at least 2 pieces of state (e.g. selected item, list
data, loading flag)
• Add useEffect to load your mock data on mount, replacing hard-coded
JSX values
• Add useRef for one DOM reference (e.g. an input you can focus)
• Add a typed onChange handler using
React.ChangeEvent<HTMLInputElement>
• Write 2 custom hooks with explicit return types (your own, or
useToggle/usePrevious)*/
