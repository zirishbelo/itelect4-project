import type { RSVP } from "../types/index";

interface RSVPBadgeProps {
    rsvp: RSVP;
    children?: React.ReactNode;
}

const RSVPBadge: React.FC<RSVPBadgeProps> = ({
    rsvp,
    children,
}) => {
    return (
        <div className="rsvp-badge">
            <h3>RSVP: {rsvp.userId}</h3>
            <p>Status: {rsvp.status ?? "Not graded yet"}</p>
            <p>Submitted at: {rsvp.submittedAt.toLocaleDateString()}</p>
            {children}
        </div>
    );
};

export default RSVPBadge;
