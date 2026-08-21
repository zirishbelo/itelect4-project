import { useState } from "react";
import { useQuery, useMutation, useQueryClient }
    from "@tanstack/react-query";
import type { ApiRSVP } from "../types/index";
import RSVPBadge from "../components/RSVPBadge";
import { fetchRSVP, createRSVP } from "../api/client";

function RSVPPage() {
    // Local, because only this one form reads it. Not store material.
    const [status, setStatus] = useState<string>("");
    const queryClient = useQueryClient();

    const { data, isPending, isError } = useQuery<ApiRSVP[]>({
        queryKey: ["RSVP"],
        queryFn: fetchRSVP,
    });

    const addRSVP = useMutation({
        mutationFn: createRSVP,
        onSuccess: () => {
            // "the submissions list is out of date now -- go and refetch it"
            queryClient.invalidateQueries({ queryKey: ["RSVP"] });
            setStatus("");
        },
    });

    const handleAdd = (): void => {
        addRSVP.mutate({
            userId: "USER-001",
            eventTitle: "GAAP 2026",
            status: "pending",
            submittedAt:  new Date().toISOString(),
        });
    };

    if (isPending) {
        return <div className="animate-pulse p-6">Loading RSVPs...</div>;
    }
    if (isError) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                Could not load RSVPs.
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900
dark:text-white">My RSVPs</h2>
            <div className="mb-6 flex gap-2">
                <input value={status}
                    onChange={(r) => setStatus(r.target.value)}
                    placeholder="Status"
                    className="w-full rounded border border-gray-300 p-2" />
                <button onClick={handleAdd}
                    disabled={status === "" || addRSVP.isPending}
                    className="rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold
text-white transition hover:bg-blue-700 disabled:bg-gray-400">
                    {addRSVP.isPending ? "Saving..." : "Add"}
                </button>
            </div>
            {addRSVP.isError && (
                <p className="mb-4 text-sm text-red-700">
                    {addRSVP.error.message}</p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data.map((r) => (
                    <RSVPBadge key={r.userId} rsvp={r}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Event: {r.eventTitle}</p>
                    </RSVPBadge>
                ))}
            </div>
        </div>
    );
}
export default RSVPPage;