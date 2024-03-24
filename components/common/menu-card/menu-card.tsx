import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";
import { useTranslations } from 'next-intl';
import { forwardRef } from "react";
import { z } from "zod";
import {
  FooterButtonTypes,
  FooterButtonVariant,
  MenuCardPropsSchema
} from "./menu-card.types";
import "./styles.css";
import MenuButton from "./button/menu-buttons";


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
          className="flex justify-center w-full p-4"
          aria-label={title.ariaLabel}
        >
          {title.label}
        </div>

        {classification && (
          <div
            className=" flex justify-center w-full p-4"
            aria-label={classification.ariaLabel}
          >
            {Array.from({ length: classification.max }, (_, index) => (
              <StarFilledIcon
                key={index}
                className={cn(
                  "menu-card__star",
                  index < (classification.current || 0)
                    ? "text-yellow-500"
                    : "text-gray-400",
                  "w-5 h-5"
                )}
              />
            ))}
          </div>
        )}

        <div className=" flex justify-around w-full p-4">
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

