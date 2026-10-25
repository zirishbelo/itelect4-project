import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RSVPBadge from "./RSVPBadge";
import type { ApiRSVP } from "../types/index";

const rsvp: ApiRSVP = {
    id: "665f1c2ab4e8d3a1f0c9e101",
    userId: "665f1c2ab4e8d3a1f0c9e001",
    eventTitle: "Test Event",
    status: "pending",
    submittedAt: "2026-10-25T00:00:00.000Z",
};

describe("RSVPBadge", () => {
    it("shows the attendee and current RSVP status", () => {
        render(<RSVPBadge rsvp={rsvp} />);
        expect(
            screen.getByText(`Attendee ID: ${rsvp.userId}`),
        ).toBeInTheDocument();
        expect(screen.getByText("Status: pending")).toBeInTheDocument();
    });

    it("shows a changed status when the RSVP is confirmed", () => {
        const confirmedRsvp: ApiRSVP = { ...rsvp, status: "confirmed" };

        render(<RSVPBadge rsvp={confirmedRsvp} />);

        expect(screen.getByText("Status: confirmed")).toBeInTheDocument();
    });
});
