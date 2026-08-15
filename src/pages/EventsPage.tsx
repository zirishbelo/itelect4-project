import { useState, useEffect, useRef } from "react";
import { Link } from "react-router"; // <-- NEW
import type { Event } from "../types/index";
import EventCard from "../components/EventCard";
import usePrevious from "../hooks/usePrevious";
import { allEvents } from "../data/mockData"; // <-- NEW
function EventsPage() {
    // from Session 5's App.tsx, unchanged
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchInputRef = useRef<HTMLInputElement>(null);
    const previousSearch = usePrevious(searchTerm);

    useEffect(() => {
        setTimeout(() => {
            setEvents(allEvents);
            setIsLoading(false);
        }, 500);
    }, []);

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchTerm(e.target.value);
    };
    // Matches the CODE as well as the title -- typing ITELECT has to work
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isLoading) {
        return <div className="animate-pulse p-6">Loading events...</div>;
    }
    if (isError) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Could not load events.
            </div>
        );
    }
    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900
 dark:text-white">Events</h2>
            <button onClick={() => setIsError(true)}
                className="mb-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700">
                Simulate Error
            </button>
            <input ref={searchInputRef} value={searchTerm}
                onChange={handleSearchChange} placeholder="Search events..."
                className="w-full rounded border border-gray-300 p-2" />
            {previousSearch !== undefined && previousSearch !== searchTerm && (
                <p className="mt-1 text-sm text-gray-500">
                    Previous search: "{previousSearch}"</p>
            )}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2
 lg:grid-cols-3">
                {filteredEvents.map((e) => (
                    <Link key={e.title} to={`/events/${e.title}`}> {/* <-- NEW */}
                        <EventCard event={e} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default EventsPage