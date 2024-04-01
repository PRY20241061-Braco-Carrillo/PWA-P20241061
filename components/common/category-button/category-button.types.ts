
import { DessertCategoryIcon, DrinksCategoryIcon, EntryCategoryIcon, KidsCategoryIcon, OfferCategoryIcon, PrincipalCategoryIcon, SnackCategoryIcon, TrendCategoryIcon } from "@/components/icons";
import { z } from "zod";


export const CategoryButtonIconComponents = {
    SnackCategory: SnackCategoryIcon,
    DrinkCategory: DrinksCategoryIcon,
    DessertCategory: DessertCategoryIcon,
    EntryCategory: EntryCategoryIcon,
    KidsCategory: KidsCategoryIcon,
    OfferCategory: OfferCategoryIcon,
    PrincipalCategory: PrincipalCategoryIcon,
    TrendCategory: TrendCategoryIcon,
  };
  
  
  const CategoryButtonIconNames = z.enum(Object.keys(CategoryButtonIconComponents) as [string, ...string[]]);
  
  const CategoryActionTypeEnum = z.enum([
    "navigate",
  ]);
  
  
  export const ActionTypeEnums = CategoryActionTypeEnum.enum;
  
  
  export const CategoryButtonConfigSchema = z.object({
    label: z.string(),
    ariaLabel: z.string(),
    ariaPressed: z.boolean(),
    ariaExpanded: z.boolean(),
    disabled: z.boolean().optional(),
    icon: CategoryButtonIconNames.optional(),
    actionType: CategoryActionTypeEnum,
    path: z.string().optional(), 
    id: z.string().optional(),
  });
  
  
  
  export const CategoryButtonsConfigSchema = z.record(CategoryButtonConfigSchema);
  
  export type CategoryButtonConfig = z.infer<typeof CategoryButtonConfigSchema>;
  export type CategoryButtonsConfig = z.infer<typeof CategoryButtonsConfigSchema>;
  
  export const CategoryButtonConfigRecordSchema = z.record(CategoryButtonConfigSchema);
  export type CategoryButtonConfigRecord = z.infer<typeof CategoryButtonConfigRecordSchema>;
  
  