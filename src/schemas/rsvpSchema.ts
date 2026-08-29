import { z } from "zod";

export const rsvpSchema = z.object({
    eventTitle: z
        .string()
        .min(1, "Please enter an event.")
        .refine(
            (title) => title.trim().length > 0,
            {
                message: "Event name cannot contain only spaces.",
            }
        ),

    status: z.enum(
        ["pending", "confirmed", "waitlisted"],
        {
            message: "Please select an RSVP status.",
        }
    ),
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;