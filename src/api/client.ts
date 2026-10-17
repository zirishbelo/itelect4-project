import type {
    ApiRSVP,
    ApiUser,
    AuthReply,
    Event,
    NewRSVP,
} from "../types/index";
import useAuthStore from "../store/authStore";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (!configuredApiUrl) {
    throw new Error(
        "VITE_API_URL is missing. Copy .env.example to .env, fill it in, and restart npm run dev.",
    );
}

export const API_URL = configuredApiUrl.replace(/\/+$/, "");

async function request<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const token = useAuthStore.getState().token;

    const res = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init.headers,
        },
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Request failed (${res.status})`);
    }

    return res.json();
}

export function fetchEvents(): Promise<Event[]> {
    return request<Event[]>("/api/events");
}

export function fetchEventByTitle(title: string): Promise<Event> {
    return request<Event>(`/api/events/${encodeURIComponent(title)}`);
}

export function fetchRSVP(): Promise<ApiRSVP[]> {
    return request<ApiRSVP[]>("/api/rsvp");
}

export function createRSVP(newRSVP: NewRSVP): Promise<ApiRSVP> {
    return request<ApiRSVP>("/api/rsvp", {
        method: "POST",
        body: JSON.stringify(newRSVP),
    });
}

export function registerUser(body: {
    name: string;
    email: string;
    password: string;
}): Promise<ApiUser> {
    return request<ApiUser>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export function loginUser(body: {
    email: string;
    password: string;
}): Promise<AuthReply> {
    return request<AuthReply>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
    });
}
