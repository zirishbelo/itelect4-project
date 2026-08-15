import type { RSVP } from "../types/index";
interface RSVPBadgeProps {
    rsvp: RSVP;
    children?: React.ReactNode;
}

const RSVPBadge: React.FC<RSVPBadgeProps> = ({
    rsvp,
    children,
}) => {
    return ( // <-- only this block changes
         <div className="rounded-lg border border-gray-200 bg-white p-5
shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">RSVP: {rsvp.userId}</h3>
            <p className="text-gray-600 dark:text-gray-300">Status: {rsvp.status ?? "Not submitted yet"}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Submitted at: {rsvp.submittedAt.toLocaleDateString()}</p>
            {children}
        </div>
    );
};
    export default RSVPBadge; 
