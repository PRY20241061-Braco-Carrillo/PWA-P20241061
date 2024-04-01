import { CurrencySchema } from "@/src/constants/currency.types";
import { z } from "zod";
import { LabelType } from "./menu-label.types";
import { FooterButtonTypes } from "./menu-footer_buttons.types";
import { MenuVariantsType } from "./menu-variants.types";
import { TimeRangeSchema } from "./menu-time.types";
import { AriaLiveSchema, AriaRoleSchema } from "@/src/constants/aria.types";
import { SizeSchema } from "@/src/constants/size_units.types";



const NumericValueSchema = z.object({
  amount: z.union([z.string(), z.number()]), 
  unit: z.union([CurrencySchema, z.literal('%')]), 
});

export const ValueSchema = z.union([
  NumericValueSchema,
  SizeSchema,
]);


const LabelSchema = z.object({
  type: LabelType,
  value: ValueSchema,
  priority: z.number().optional(),
}).superRefine((data, ctx) => {

  if (data.type === "SIZE" && ("amount" in data.value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The "amount" field is not allowed for the "SIZE" type.',
    });
}});

export type Label = z.infer<typeof LabelSchema>;


const PrimaryImageSchema = z.object({
  path: z.string().url({ message: "The path should be a valid URL." }),
  alt: z.string(),
  ariaLabel: z.string(),
  labels: z.array(LabelSchema).max(3),
});

const TitleSchema = z.object({
  label: z.string(),
  ariaLabel: z.string(),
});

const ClassificationSchema = z.object({
  max: z
    .number()
    .min(0, { message: "The maximum classification cannot be negative." }),
  min: z
    .number()
    .min(0, { message: "The minimum classification cannot be negative." }),
  ariaLabel: z.string(),
  current: z.number()
    .min(0, { message: "The current classification cannot be negative." })
    .optional(),
});

const FooterButtonVariantSchema = z.object({
  type: FooterButtonTypes,
});

export type FooterButtonVariant = z.infer<typeof FooterButtonVariantSchema>;

const PriceSchema = z.object({
  value: z.number().min(0, { message: "The price cannot be negative." }),
  currency: CurrencySchema,
  ariaLabel: z.string(),
  ariaLive: AriaLiveSchema.optional(),
  ariaRole: AriaRoleSchema.optional(),
});

const HeaderSchema = z.object({
  time: TimeRangeSchema,
  price: PriceSchema,
  ariaLabel: z.string(),
});


const MenuCardPropsSchema = z
  .object({
    header: HeaderSchema,
    ariaLabel: z.string(),
    ariaLive: AriaLiveSchema.optional(),
    ariaRole: AriaRoleSchema.optional(),
    primaryImage: PrimaryImageSchema,
    title: TitleSchema,
    classification: ClassificationSchema.optional(),
    footerButtons: z.array(FooterButtonVariantSchema),
    availableSizes: z.array(SizeSchema).optional(),
    asChild: z.boolean().optional(),
    variant: MenuVariantsType,
  })
  .superRefine((data, ctx) => {
    if (data.footerButtons.length > 3 && data.ariaRole !== "menuitem") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'The "ariaRole" should be "menuitem" when there are more than 3 footer buttons.',
      });
    }

    if (data.header.time.min > data.header.time.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The minimum time should be less than the maximum time.",
      });
    }

    if (data.classification && data.classification.current) {
      if (
        data.classification.current < data.classification.min ||
        data.classification.current > data.classification.max
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "The current classification should be between the minimum and maximum classification.",
        });
      }
    }
  });


export type MenuCardProps = z.infer<typeof MenuCardPropsSchema>;

export {
  TimeRangeSchema,
  LabelSchema,
  PrimaryImageSchema,
  TitleSchema,
  ClassificationSchema,
  FooterButtonVariantSchema,
  MenuCardPropsSchema,
};
