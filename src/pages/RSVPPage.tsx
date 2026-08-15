import RSVPBadge from "../components/RSVPBadge";
import { allRSVPs} from "../data/mockData";
function RSVPPage() {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900
 dark:text-white">My RSVPs</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {allRSVPs.map((rsvp) => (
                    <RSVPBadge key={rsvp.id} rsvp={rsvp}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Event: {rsvp.eventId}</p>
                    </RSVPBadge>
                ))}
            </div>
        </div>
    );
}
export default RSVPPage;
