import { z } from "zod";

export const TimeScaleSchema = z.enum(["seconds", "minutes", "hours", "days"]);

export const TimeRangeSchema = z.object({
  ariaLabel: z.string(),
  min: z.number().min(0, { message: "The minimum time cannot be negative." }),
  max: z.number().min(0, { message: "The maximum time cannot be negative." }),
  scale: TimeScaleSchema,
});
