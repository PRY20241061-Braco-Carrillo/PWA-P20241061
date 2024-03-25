import { CubeIcon, EyeOpenIcon, FileTextIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";

export const IconComponents = {
  AddIcon: PlusCircledIcon,
  ViewIcon: EyeOpenIcon, 
  ArIcon: CubeIcon,
  PromotionDetailIcon: FileTextIcon,
};


const IconNames = z.enum(Object.keys(IconComponents) as [string, ...string[]]);


const ButtonVariant = z.enum([
  "default", "secondary", "ghost",
]);

const ActionTypeEnum = z.enum([
  "navigate", "dialog", "ar", "addToCart", "promotionDetail",
]);


export type ButtonVariant = z.infer<typeof ButtonVariant>;
export const ActionTypeEnums = ActionTypeEnum.enum;


export const ButtonConfigSchema = z.object({
  label: z.string(),
  ariaLabel: z.string(),
  ariaPressed: z.boolean(),
  ariaExpanded: z.boolean(),
  disabled: z.boolean().optional(),
  icon: IconNames.optional(),
  variant: ButtonVariant,
  actionType: ActionTypeEnum.optional(),
  path: z.string().optional(), 
  id: z.string().optional(),
});



export const ButtonsConfigSchema = z.record(ButtonConfigSchema);

export type ButtonConfig = z.infer<typeof ButtonConfigSchema>;
export type ButtonsConfig = z.infer<typeof ButtonsConfigSchema>;

export const ButtonConfigRecordSchema = z.record(ButtonConfigSchema);
export type ButtonConfigRecord = z.infer<typeof ButtonConfigRecordSchema>;

