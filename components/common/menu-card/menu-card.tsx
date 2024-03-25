import ImageWithFallback from "@/components/ui/image";
import { cn, getCurrencySymbol } from "@/lib/utils";
import StarFilledIcon from "../../icons/star-filled.svg";
import { cva, VariantProps } from "class-variance-authority";
import { useTranslations } from 'next-intl';
import { forwardRef } from "react";
import { z } from "zod";
import MenuButton from "./button/menu-buttons";
import {
  FooterButtonVariant,
  MenuCardPropsSchema
} from "./menu-card.types";
import "./styles.css";


const menuCardVariants = cva([], {
  variants: {
    variant: {
      discount: "bg-discountMenuCard",
      standard: "bg-standardMenuCard",
      full: "bg-fullMenuCard",
      ghost: "bg-ghostMenuCard",
    }
  },
  defaultVariants: {
    variant: "standard"
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
  } = result.data;

  const t = useTranslations('MenuCard');
  const timeScaleTranslation = t(`timeScale.${header.time.scale}`);

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
          {header.time.min} - {header.time.max}  {timeScaleTranslation}
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
          />
        </div>

        <div
          className="flex justify-center w-full text-lg font-normal pt-2"
          aria-label={title.ariaLabel}
        >
          {title.label}
        </div>
        {variant !== "full" && (
        <div className="flex justify-center w-full text-2xl font-semibold pt-2" aria-label={title.ariaLabel}>
          {getCurrencySymbol(header.price.currency)} {header.price.value.toFixed(2)}
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
                  index < (classification.current || 0)
                    ? "text-yellow-500"
                    : "text-black",
                )}
              />
            ))}
          </div>
        )}

<div className="flex flex-col w-full p-4 space-y-2">
  {footerButtons.map((button: FooterButtonVariant, index) => (
    <MenuButton
      key={index}
      typeStyle={button.type} 
    />
  ))}
</div>

      </div>
    </div>
  );
});

MenuCard.displayName = "MenuCard";

export { MenuCard };

