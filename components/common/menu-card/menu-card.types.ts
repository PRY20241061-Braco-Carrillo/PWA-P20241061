import { z } from "zod";

const MenuVariantsType = z.enum(["discount", "standard", "full", "ghost"]);

const LabelType = z.enum(["DISCOUNT", "SIZE"]);
const LabelTypePosition = z.enum(["TOP", "BOTTOM"]);

const TitleAlignment = z.enum(['LEFT', 'CENTER', 'RIGHT']);
const FooterButtonVariant = z.enum(["ADD", "AR", "VIEW", "CUSTOM"]);

const TitleStyle = z.enum(["LIGHT", "BOLD"]);
const StylePrice = z.enum(["LIGHT", "BOLD", "STRIKE"]);

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

const TimeRangeSchema = z.object({
  ariaLabel: z.string(),
  min: z.number().min(0, { message: "The minimum time cannot be negative." }),
  max: z.number().min(0, { message: "The maximum time cannot be negative." }),
});

const LabelSchema = z.object({
  type: LabelType,
  ariaLabel: z.string(),
  value: z.union([z.number(), z.string()]),
  position: LabelTypePosition,
});

const PrimaryImageSchema = z.object({
  path: z.string().url({ message: "The path should be a valid URL." }),
  alt: z.string(),
  ariaLabel: z.string(),
  labels: z.array(LabelSchema),
});

const TitleSchema = z.object({
  label: z.string(),
  style: TitleStyle,
  ariaLabel: z.string(),
  alignment: TitleAlignment,
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

const PriceSchema = z.object({
  value: z.number().min(0, { message: "The price cannot be negative." }),
  currency: CurrencySchema,
  ariaLabel: z.string(),
  ariaLive: AriaLiveSchema.optional(),
  ariaRole: AriaRoleSchema.optional(),
  style: StylePrice,
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
    className: z.string().optional(),
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
