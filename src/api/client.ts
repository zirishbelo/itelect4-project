import type { Event, ApiRSVP, NewRSVP } from "../types/index";

export const API_URL = "http://localhost:3001";

// GET /events
export async function fetchEvents(): Promise<Event[]> {
    const res = await fetch(`${API_URL}/events`);
    if (!res.ok) {
        throw new Error("Could not load events");
    }
    return res.json();
}

// GET /events?title=eventTitle
export async function fetchEventByTitle(title: string): Promise<Event> {
    const res = await fetch(`${API_URL}/events?title=${title}`);
    if (!res.ok) {
        throw new Error("Could not load that event");
    }
    const matches: Event[] = await res.json();
    if (matches.length === 0) {
        throw new Error(`No event found with title "${title}".`);
    }
    return matches[0];
}

// GET /rsvp
export async function fetchRSVP(): Promise<ApiRSVP[]> {
    const res = await fetch(`${API_URL}/rsvps`);
    if (!res.ok) {
        throw new Error("Could not load RSVPs");
    }
    return res.json();
}

// POST /rsvp
export async function createRSVP(
    newRSVP: NewRSVP
): Promise<ApiRSVP> {
    const res = await fetch(`${API_URL}/rsvps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRSVP),
    });
    if (!res.ok) {
        throw new Error("Could not save the RSVP");
    }
    return res.json();
}
