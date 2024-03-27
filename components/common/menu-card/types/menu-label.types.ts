import { z } from "zod";

export const LabelType = z.enum(["DISCOUNT", "SIZE"]);
export type LabelType = z.infer<typeof LabelType>;
