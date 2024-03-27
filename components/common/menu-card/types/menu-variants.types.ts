import { z } from "zod";

export const MenuVariantsType = z.enum(["discount", "standard", "full", "ghost"]);
export type MenuVariantsType = z.infer<typeof MenuVariantsType>;
