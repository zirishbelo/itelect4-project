import { useState, useEffect, useRef } from "react";
import type { User, Event, RSVP } from "./types/index";
import UserCard from "./components/UserCard";
import EventCard from "./components/EventCard";
import RSVPBadge from "./components/RSVPBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

function App() {
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [isError, setIsError] = useState<boolean>(false);

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
        date: new Date("2027-07-19"),
      },
      {
        id: "EVENT-004",
        title: "Career Talk",
        venue: "CBEAM Auditorium",
        date: new Date("2027-07-20"),
      }
    ];

    const mockRSVP: RSVP[] = [{
      id: "RSVP-002",
      userId: "USER-002",
      eventId: "EVENT-002",
      status: "pending",
      submittedAt: new Date(),
    }];

    setTimeout(() => {
    setEvents(mockEvent);
    setSelectedUser(mockStudent[0]);
    setRsvps(mockRSVP);
    setIsLoading(false);
    searchInputRef.current?.focus();
    }, 500);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-1000 dark:text-gray-300">
        Loading events...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
        Could not load events. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <button onClick={toggleDarkMode}
          className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white
dark:bg-gray-200 dark:text-gray-900">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <button onClick={() => setIsError(true)} className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700">
          Simulate Error
        </button>

        <input ref={searchInputRef} value={searchTerm} onChange={handleSearchChange}
          placeholder="Search events..." className="mt-4 w-full rounded border p-2" />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="text-gray-600 dark:text-gray-300">Previous search: "{previousSearch}" </p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UserCard user={selectedUser} onSelect={setSelectedUser} />
          {selectedUser && <p className="text-gray-600 dark:text-gray-300">Selected: {selectedUser.name}</p>}
           <button onClick={toggleDetails} className="rounded bg-blue-500 text-white hover:bg-blue-600w-[80px] h-[30px] text-xs">
            {showDetails ? "Hide" : "Show"} Details
          </button>
          {showDetails &&filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
