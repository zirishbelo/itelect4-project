import { z } from "zod";

export const rsvpReviewFormSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(
            20,
            "Describe the student, event, and RSVP flow in at least 20 characters.",
        )
        .max(2000, "Keep the RSVP system description under 2000 characters."),
});

export type RsvpReviewFormValues = z.infer<typeof rsvpReviewFormSchema>;
