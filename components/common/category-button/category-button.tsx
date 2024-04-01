"use client";


import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { categoryButtonConfig } from "./category-button-config";
import { ActionTypeEnums, CategoryButtonIconComponents } from "./category-button.types";
import { Button,  } from "@/components/ui/button"; 
import { cn } from "@/lib/utils"; 
import { CategoryButtonVariantProps, categoryButtonVariants } from "./category-button.styles";

interface MenuButtonProps extends CategoryButtonVariantProps {
    typeStyle: keyof typeof categoryButtonConfig;
}

const CategoryButton: React.FC<MenuButtonProps> = ({ typeStyle, iconPosition = 'left' }) => {
    const t = useTranslations("Category");
    const router = useRouter();
    const label = t("categories." + typeStyle + ".label");
    const ariaLabel = t("categories." + typeStyle + ".ariaLabel");

    const config = categoryButtonConfig[typeStyle];
    if (!config) {
        console.error(`No configuration found for button type: ${typeStyle}`);
        return null;
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (config.actionType === ActionTypeEnums.navigate && config.path) {
            router.push(config.path);
        } else {
            console.error(`Action type ${config.actionType} is not supported`);
        }
    };

    const Icon = config.icon ? CategoryButtonIconComponents[config.icon as keyof typeof CategoryButtonIconComponents] : null;
    const buttonClassName = cn(
        categoryButtonVariants({ iconPosition }),
        "text-lg md:text-xl",
        "w-full h-full",
      );
    return (
        <Button
            aria-label={ariaLabel}
            aria-pressed={config.ariaPressed}
            aria-expanded={config.ariaExpanded}
            disabled={config.disabled}
            onClick={handleClick}
            className={buttonClassName}
        >
            {Icon && <Icon className="h-48 w-48 " />}
            <span>{label}</span>
        </Button>
    );
};

export default CategoryButton;
