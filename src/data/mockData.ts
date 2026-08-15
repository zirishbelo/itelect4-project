import type { User, Event, RSVP } from "../types/index";
export const student: User = {
    id: "USER-001",
    name: "Zurinee Belo",
    email: "zurineeirish@gmail.com",
    role: "attendee",
    isActive: true,
};
export const allEvents: Event[] = [
    {
        id: "EVENT-001",
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
export const allRSVPs: RSVP[] = [
    {
        id: "RSVP-001",
        userId: "USER-001",
        eventId: "EVENT-001",
        status: "pending",
        submittedAt: new Date("2026-07-20"),
    },
];