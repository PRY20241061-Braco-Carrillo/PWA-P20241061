import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { z } from "zod";
import { MenuCardPropsSchema } from "./menu-card.types";
import Image from 'next/image';

const menuCardVariants = cva(
  [
    "relative",
    "flex",
    "flex-col",
    "items-center",
    "overflow-hidden",
    "shadow-lg",
    "transition-all",
    "rounded-tl-3xl",
    "rounded-br-3xl",
    "max-w-lg",
    "mx-auto",
  ],
  {
    variants: {
      variant: {
        discount: "bg-discountMenuCard",
        standard: "bg-standardMenuCard",
        full: "bg-fullMenuCard",
        ghost: "bg-ghostMenuCard",
      },
      imageSize: {
        small: "w-1/2 h-auto rounded-lg",
        medium: "w-3/4 h-auto rounded-lg",
        large: "w-full h-auto rounded-lg",
      },
    },
    defaultVariants: {
      variant: "standard",
      imageSize: "medium",
    },
  }
);

type MenuCardVariantProps = VariantProps<typeof menuCardVariants>;

const MenuCard = forwardRef<
  HTMLDivElement,
  z.infer<typeof MenuCardPropsSchema> & MenuCardVariantProps
>((props, ref) => {
  const result = MenuCardPropsSchema.safeParse(props);
  if (!result.success) {
    console.error(result.error);
    return null;
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
    className,
    variant,
  } = result.data;

  const classNames = menuCardVariants({
    variant,
    className,
    imageSize: props.imageSize,
  });

  return (
    <div
      ref={ref}
      className={classNames}
      aria-label={ariaLabel}
      aria-live={ariaLive || undefined}
      role={ariaRole || undefined}
    >
      <div
        className="menu-card__header flex justify-between w-full p-4"
        aria-label={header.ariaLabel}
      >
        <div aria-label={header.time.ariaLabel}>
          Time: {header.time.min} - {header.time.max}
        </div>
        <div
          aria-label={header.price.ariaLabel}
          className={`${header.price.style.toLowerCase()} w-full text-right`}
        >
          Price: {header.price.value} {header.price.currency}
        </div>
      </div>

      <div className="menu-card__image-container flex justify-center w-full py-4">
        <div className={menuCardVariants({ imageSize: props.imageSize }) + " relative w-full h-full"}>
          <Image
            src={primaryImage.path}
            alt={primaryImage.alt}
            layout="fill"
            objectFit="cover" 
            aria-label={primaryImage.ariaLabel}
          />
        </div>
      </div>

      <div
        className="menu-card__title flex justify-center w-full p-4"
        aria-label={title.ariaLabel}
        style={{
          textAlign: title.alignment.toLowerCase() as
            | "center"
            | "left"
            | "right",
        }}
      >
        {title.label}
      </div>

      {classification && (
        <div
          className="menu-card__classification flex justify-center w-full p-4"
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

      <div className="menu-card__footer flex justify-around w-full p-4">
        {footerButtons.map((button, index) => (
          <Button
            key={index}
            className="menu-card__button"
            aria-label={button.ariaLabel}
            aria-pressed={button.ariaPressed}
            aria-expanded={button.ariaExpanded}
          >
            {button.label || button.variant}
          </Button>
        ))}
      </div>
    </div>
  );
});

MenuCard.displayName = "MenuCard";

export { MenuCard };
