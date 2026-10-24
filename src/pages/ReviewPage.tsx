import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RsvpSystemReview } from "../types/index";
import { askAi } from "../api/client";
import {
    rsvpReviewFormSchema,
    type RsvpReviewFormValues,
} from "../schemas/rsvpReviewSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SYSTEM_STATUS_STYLE: Record<
    RsvpSystemReview["systemStatus"],
    string
> = {
    complete: "bg-green-100 text-green-800",
    "needs-work": "bg-yellow-100 text-yellow-800",
    incomplete: "bg-red-100 text-red-800",
};

interface ObservationListProps {
    title: string;
    observations: string[];
}

function ObservationList({ title, observations }: ObservationListProps) {
    return (
        <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                {observations.map((observation) => (
                    <li key={observation}>{observation}</li>
                ))}
            </ul>
        </div>
    );
}

function ReviewPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RsvpReviewFormValues>({
        resolver: zodResolver(rsvpReviewFormSchema),
        defaultValues: { prompt: "" },
    });

    const review = useMutation({
        mutationFn: askAi,
    });

    const onSubmit = (values: RsvpReviewFormValues): void => {
        review.mutate(values.prompt);
    };

    return (
        <div className="max-w-3xl">
            <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                AI System Review
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Describe how student accounts, events, and RSVP records
                work together.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid gap-1.5">
                    <Label htmlFor="prompt" className="text-foreground">
                        RSVP system description
                    </Label>
                    <textarea
                        id="prompt"
                        rows={6}
                        {...register("prompt")}
                        aria-invalid={errors.prompt ? true : undefined}
                        placeholder="How do students/users sign in, browse event title/venue/date, and create or manage RSVP status?"
                        className="rounded-lg border border-input bg-background p-2.5 text-sm text-foreground"
                    />
                    {errors.prompt && (
                        <p className="text-sm text-red-600">
                            {errors.prompt.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={review.isPending}
                    className="justify-self-start"
                >
                    {review.isPending
                        ? "Reviewing RSVP system..."
                        : "Review RSVP system"}
                </Button>
            </form>

            {review.isError && (
                <p className="mt-4 text-sm text-red-700">
                    {review.error.message}
                </p>
            )}

            {review.data && (
                <div className="mt-6 grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                    <span
                        className={`justify-self-start rounded px-2 py-0.5 text-sm font-semibold ${SYSTEM_STATUS_STYLE[review.data.systemStatus]}`}
                    >
                        {review.data.systemStatus}
                    </span>
                    <p className="text-gray-900 dark:text-white">
                        {review.data.summary}
                    </p>

                    <ObservationList
                        title="student observations"
                        observations={review.data.userObservations}
                    />
                    <ObservationList
                        title="Event observations"
                        observations={review.data.eventObservations}
                    />
                    <ObservationList
                        title="RSVP observations"
                        observations={review.data.rsvpObservations}
                    />
                </div>
            )}
        </div>
    );
}

export default ReviewPage;
