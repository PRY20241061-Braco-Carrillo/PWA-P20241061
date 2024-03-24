import { z } from "zod";
import {PlusCircledIcon, EyeOpenIcon, CubeIcon} from "@radix-ui/react-icons";

export const IconComponents = {
  AddIcon: PlusCircledIcon,
  ViewIcon: EyeOpenIcon, 
  ArIcon: CubeIcon,
};


const IconNames = z.enum(Object.keys(IconComponents) as [string, ...string[]]);


const ButtonVariant = z.enum([
  "default", "secondary", "ghost",
]);

export const ButtonConfigSchema = z.object({
  label: z.string(),
  ariaLabel: z.string(),
  ariaPressed: z.boolean(),
  ariaExpanded: z.boolean(),
  disabled: z.boolean().optional(),
  icon: IconNames.optional(),
  variant: ButtonVariant,
});



export const ButtonsConfigSchema = z.record(ButtonConfigSchema);

export type ButtonConfig = z.infer<typeof ButtonConfigSchema>;
export type ButtonsConfig = z.infer<typeof ButtonsConfigSchema>;

export const ButtonConfigRecordSchema = z.record(ButtonConfigSchema);
export type ButtonConfigRecord = z.infer<typeof ButtonConfigRecordSchema>;