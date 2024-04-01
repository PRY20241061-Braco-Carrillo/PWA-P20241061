import { MenuCardButtonConfig, MenuCardButtonConfigRecord, MenuCardButtonsConfigSchema } from "./menu-button.types";



const rauwButtonAddConfig: MenuCardButtonConfig = {
    label: "Add",
    ariaLabel: "Add",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    actionType: "addToCart",
    icon: "AddIcon",
    variant: "default",
};

const rawButtonViewConfig: MenuCardButtonConfig = {
    label: "View",
    ariaLabel: "View",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    actionType: "navigate",
    path: "/products/",
    icon: "ViewIcon",
    variant: "default",
};

const rawButtonArConfig: MenuCardButtonConfig = {
    label: "AR",
    ariaLabel: "AR",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "ArIcon",
    variant: "default",
};

const rauwButtonPromotionDetailConfig: MenuCardButtonConfig = {
    label: "Promotion Detail",
    ariaLabel: "Promotion Detail",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "PromotionDetailIcon",
    variant: "default",
};

const rawButtonConfig: MenuCardButtonConfigRecord = {
    ADD: rauwButtonAddConfig,
    VIEW: rawButtonViewConfig,
    AR: rawButtonArConfig,
    PROMOTION_DETAIL: rauwButtonPromotionDetailConfig,
};

export const buttonConfig = MenuCardButtonsConfigSchema.parse(rawButtonConfig);
