import { CubeIcon, EyeOpenIcon, FileTextIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";

export const MenuCardIconComponents = {
  AddIcon: PlusCircledIcon,
  ViewIcon: EyeOpenIcon, 
  ArIcon: CubeIcon,
  PromotionDetailIcon: FileTextIcon,
};


const MenuCardIconNames = z.enum(Object.keys(MenuCardIconComponents) as [string, ...string[]]);


const MenuCardButtonVariant = z.enum([
  "default", "secondary", "ghost",
]);

const MenuCardActionTypeEnum = z.enum([
  "navigate", "dialog", "ar", "addToCart", "promotionDetail",
]);


export type MenuCardButtonVariant = z.infer<typeof MenuCardButtonVariant>;
export const MenuCardActionTypeEnums = MenuCardActionTypeEnum.enum;


export const MenuCardButtonConfigSchema = z.object({
  label: z.string(),
  ariaLabel: z.string(),
  ariaPressed: z.boolean(),
  ariaExpanded: z.boolean(),
  disabled: z.boolean().optional(),
  icon: MenuCardIconNames.optional(),
  variant: MenuCardButtonVariant,
  actionType: MenuCardActionTypeEnum.optional(),
  path: z.string().optional(), 
  id: z.string().optional(),
});



export const MenuCardButtonsConfigSchema = z.record(MenuCardButtonConfigSchema);

export type MenuCardButtonConfig = z.infer<typeof MenuCardButtonConfigSchema>;
export type MenuCardButtonsConfig = z.infer<typeof MenuCardButtonsConfigSchema>;

export const MenuCardButtonConfigRecordSchema = z.record(MenuCardButtonConfigSchema);
export type MenuCardButtonConfigRecord = z.infer<typeof MenuCardButtonConfigRecordSchema>;

