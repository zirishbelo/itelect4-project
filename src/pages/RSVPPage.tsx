import { useQuery, useMutation, useQueryClient }
    from "@tanstack/react-query";
import type { ApiRSVP } from "../types/index";
import RSVPBadge from "../components/RSVPBadge";
import { fetchRSVP, createRSVP } from "../api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema } from "../schemas/rsvpSchema";
import type { RSVPFormValues } from "../schemas/rsvpSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function RSVPPage() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RSVPFormValues>({
        resolver: zodResolver(rsvpSchema),
        mode: "onBlur",
        defaultValues: {
            eventTitle: "",
        },
    });

    const { data, isPending, isError } = useQuery<ApiRSVP[]>({
        queryKey: ["RSVP"],
        queryFn: fetchRSVP,
    });

    const addRSVP = useMutation({
        mutationFn: createRSVP,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["RSVP"] });
            reset();
        },
    });

    const onSubmit = (values: RSVPFormValues): void => {
        addRSVP.mutate({
            userId: "USER-001",
            eventTitle: values.eventTitle,
            status: values.status,
            submittedAt: new Date().toISOString(),
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
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-6 max-w-md space-y-4"
            >
                <div className="space-y-2">
                    <Label htmlFor="eventTitle">
                        Event
                    </Label>


                    <Input
                        id="eventTitle"
                        {...register("eventTitle")}
                        aria-invalid={errors.eventTitle ? true : undefined}
                        placeholder="Enter event name"
                    />

                    {errors.eventTitle && (
                        <p className="text-sm text-red-600">
                            {errors.eventTitle.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="status">
                        RSVP Status
                    </Label>

                    <select
                        id="status"
                        {...register("status")}
                        className="w-full rounded-md border border-gray-300 bg-white p-2
        dark:border-gray-700 dark:bg-gray-800"
                        aria-invalid={errors.status ? true : undefined}
                    >
                        <option value="">Select RSVP status...</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="waitlisted">Waitlisted</option>
                    </select>

                    {errors.status && (
                        <p className="text-sm text-red-600">
                            {errors.status.message}
                        </p>
                    )}
                </div>
                <Button
                    type="submit"
                    disabled={addRSVP.isPending}
                >
                    {addRSVP.isPending ? "Saving..." : "Add RSVP"}
                </Button>
            </form>
            {addRSVP.isError && (
                <p className="mb-4 text-sm text-red-700">
                    {addRSVP.error.message}</p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {data.map((r) => (
                    <RSVPBadge key={r.id} rsvp={r}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Event: {r.eventTitle}</p>
                    </RSVPBadge>
                ))}
            </div>
        </div>
    );
}
export default RSVPPage;