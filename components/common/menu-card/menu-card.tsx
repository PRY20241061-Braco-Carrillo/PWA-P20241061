import ImageWithFallback from "@/components/ui/image";
import { cn, getCurrencySymbol } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import { z } from "zod";

import MenuButton from "./button/menu-buttons";
import {
  FooterButtonVariant,
  Label,
  MenuCardPropsSchema,
} from "./types/menu-card.types";
import "./styles.css";
import { LabelType } from "./types/menu-label.types";
import { TranslatableSize } from "@/src/constants/size_units.types";
import { StarFilledIcon } from "@/components/icons";
import DynamicSizeSelector from "./size-selector/size-selector";

const menuCardVariants = cva([], {
  variants: {
    variant: {
      discount: "bg-discountMenuCard",
      standard: "bg-standardMenuCard",
      full: "bg-fullMenuCard",
      ghost: "bg-ghostMenuCard",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

type MenuCardVariantProps = VariantProps<typeof menuCardVariants>;

const MenuCard = forwardRef<
  HTMLDivElement,
  z.infer<typeof MenuCardPropsSchema> & MenuCardVariantProps
>((props, ref) => {
  const result = MenuCardPropsSchema.safeParse(props);

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const {
    header,
    primaryImage,
    title,
    classification,
    footerButtons,
    ariaLabel,
    ariaLive,
    ariaRole,
    variant,
    availableSizes,
  } = result.data;

  const t = useTranslations();
  const menuCardPrefix = "MenuCard.";

  const timeScaleTranslation = t(
    menuCardPrefix + "timeScale." + header.time.scale
  );
  const { labels: primaryImageLabels } = primaryImage;

  const imageLabels: string[] = [];
  const imageLabelsAria: string[] = [];
  const imageLabelsTypes: LabelType[] = [];

  for (const label of primaryImageLabels) {
    const { type } = label;
    const baseTranslationPath = menuCardPrefix + "labelType.";
    const translatedLabel = t(baseTranslationPath + type + ".label"); ;
    const translatedAriaLabel = t(baseTranslationPath + type + ".ariaLabel");

    imageLabels.push(translatedLabel);
    imageLabelsAria.push(translatedAriaLabel);
    imageLabelsTypes.push(type);
  }


  const variantClass = cn({
    "variant-ghost": variant === "ghost",
    "variant-standard": variant === "standard",
    "variant-full": variant === "full",
    "variant-discount": variant === "discount",
  });


  return (
    <div className={`card-info ${variantClass}`}>
      <div className="card-time" aria-label={header.ariaLabel}>
        <span
          aria-label={header.time.ariaLabel}
          className="text-menuCard text-gray-500 center "
        >
          {header.time.min} - {header.time.max} {timeScaleTranslation}
        </span>
      </div>
      <div
        ref={ref}
        className="card-content"
        aria-label={ariaLabel}
        aria-live={ariaLive || undefined}
        role={ariaRole || undefined}
      >
        <div className="flex justify-center w-full  mx-auto pr-3 pl-3">
          <ImageWithFallback
            fallbackSrc="/images/fallback.jpg"
            src={primaryImage.path}
            alt={primaryImage.alt}
            aria-label={primaryImage.ariaLabel}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            imageLabels={imageLabels}
            primaryImageLabels={primaryImageLabels}
            imageLabelsAria={imageLabelsAria}
            imageLabelsTypes={imageLabelsTypes}
          />
        </div>

        <div
          className="flex justify-center w-full text-lg font-normal pt-2"
          aria-label={title.ariaLabel}
        >
          {title.label}
        </div>
        {variant !== "full" && (
          <div
            className="flex justify-center w-full text-2xl font-semibold pt-2"
            aria-label={title.ariaLabel}
          >
            {getCurrencySymbol(header.price.currency)}{" "}
            {header.price.value.toFixed(2)}
          </div>
        )}

        {classification && (
          <div
            className=" flex justify-center w-full pt-2 pb-2 text-center "
            aria-label={classification.ariaLabel}
          >
            {Array.from({ length: classification.max }, (_, index) => (
              <StarFilledIcon
                key={index}
                className={cn(
                  "w-10 h-9 sm:w-10 sm:h-9 md:w-12 md:h-11 lg:w-12 lg:h-11 xl:w-14 xl:h-12",
                  index < (classification.current || 0)
                    ? "text-yellow-500 "
                    : "text-black "
                )}
              />
            ))}
          </div>
        )}
        <div>
        {availableSizes && availableSizes.length > 0 && (
        <DynamicSizeSelector sizes={availableSizes} />
      )}
        </div>
        <div className="flex flex-col w-full p-4 space-y-2">
          {footerButtons.map((button: FooterButtonVariant, index) => (
            <MenuButton key={index} typeStyle={button.type} />
          ))}
        </div>
      </div>
    </div>
  );
});

MenuCard.displayName = "MenuCard";

export { MenuCard };
