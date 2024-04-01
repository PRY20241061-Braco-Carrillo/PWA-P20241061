"use client";

import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { buttonConfig } from "./button-config";

import {
    MenuCardActionTypeEnums,
    MenuCardButtonsConfig,
    MenuCardIconComponents,
} from "./menu-button.types";
import { cn } from "@/lib/utils";

interface MenuButtonProps {
    typeStyle: keyof MenuCardButtonsConfig;
}

const MenuButton: React.FC<MenuButtonProps> = ({ typeStyle }) => {
    const t = useTranslations("MenuCard");
    const router = useRouter();
    const label = t("buttons." + typeStyle + ".label"); 
    const ariaLabel = t("buttons." + typeStyle + ".ariaLabel"); 

    const config = buttonConfig[typeStyle];
    if (!config) {
        console.error(`No configuration found for button type: ${typeStyle}`);
        return null;
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        switch (config.actionType) {
            case MenuCardActionTypeEnums.addToCart:
                console.log("Add to cart");
                break;
            case MenuCardActionTypeEnums.navigate:
                if (!config.path) {
                    console.error(
                        `Navigate action type requires a path for button type: ${typeStyle}`
                    );
                    return;
                }
                router.push(config.path);
                break;
            case MenuCardActionTypeEnums.ar:
                console.log("AR");
                break;
            case MenuCardActionTypeEnums.dialog:
                console.log("Dialog");
                break;
            case MenuCardActionTypeEnums.promotionDetail:
                console.log("Promotion Detail");
                break;
            default:
                console.error(`Action type ${config.actionType} is not supported`);
        }
    };

    const Icon = config.icon
        ? MenuCardIconComponents[config.icon as keyof typeof MenuCardIconComponents]
        : null;

    return (
        <Button
            aria-label={ariaLabel}
            aria-pressed={config.ariaPressed}
            aria-expanded={config.ariaExpanded}
            disabled={config.disabled}
            variant={config.variant}
            className={cn(
                buttonVariants({ variant: config.variant }),
                "flex w-full justify-between items-center",
                "text-base md:text-base lg:text-lg",
              )}
            onClick={handleClick}
        >
            <span className="flex-grow flex justify-center items-center" style={{ flexBasis: '90%' }}>
                {label}
            </span>
            {Icon && (
                <span className="flex justify-center items-center " style={{ flexBasis: '10%' }}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                </span>
            )}
        </Button>
    );
};

export default MenuButton;
