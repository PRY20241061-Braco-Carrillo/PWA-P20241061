import { z } from "zod";

const MenuVariantsType = z.enum(["discount", "standard", "full", "ghost"]);
export type MenuVariantsType = z.infer<typeof MenuVariantsType>;

const LabelType = z.enum(["DISCOUNT", "SIZE"]);

const FooterButtonVariant = z.enum(["ADD", "AR", "VIEW", "CUSTOM"]);


const CurrencySchema = z.enum([
  "PEN",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CNY",
  "CAD",
  "AUD",
  "CHF",
  "SEK",
  "NZD",
]);


const AriaLiveSchema = z.enum(["off", "assertive", "polite"]);
const AriaRoleSchema = z.enum([
  "button",
  "link",
  "checkbox",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "progressbar",
  "radio",
  "slider",
  "spinbutton",
  "switch",
  "tab",
  "tablist",
  "textbox",
  "treeitem",
]);

const TimeScaleSchema = z.enum(["seconds", "minutes", "hours", "days"]);

const TimeRangeSchema = z.object({
  ariaLabel: z.string(),
  min: z.number().min(0, { message: "The minimum time cannot be negative." }),
  max: z.number().min(0, { message: "The maximum time cannot be negative." }),
  scale: TimeScaleSchema,
});

const LabelSchema = z.object({
  type: LabelType,
  ariaLabel: z.string(),
  value: z.union([z.number(), z.string()]),
});

const PrimaryImageSchema = z.object({
  path: z.string().url({ message: "The path should be a valid URL." }),
  alt: z.string(),
  ariaLabel: z.string(),
  labels: z.array(LabelSchema),
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
  variant: FooterButtonVariant,
  label: z.string().optional(),
  ariaLabel: z.string(),
  ariaPressed: z.boolean(),
  ariaExpanded: z.boolean(),
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
