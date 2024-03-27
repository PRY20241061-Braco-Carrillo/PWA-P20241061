import { z } from "zod";

export const FooterButtonTypes = z.enum(["ADD", "AR", "VIEW", "PROMOTION_DETAIL"]);
export type FooterButtonType = z.infer<typeof FooterButtonTypes>;
