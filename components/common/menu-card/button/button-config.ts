import { ButtonConfig, ButtonConfigRecord, ButtonsConfigSchema } from "./menu-button.types";



const rauwButtonAddConfig: ButtonConfig = {
    label: "Add",
    ariaLabel: "Add",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    actionType: "addToCart",
    icon: "AddIcon",
    variant: "default",
};

const rawButtonViewConfig: ButtonConfig = {
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

const rawButtonArConfig: ButtonConfig = {
    label: "AR",
    ariaLabel: "AR",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "ArIcon",
    variant: "default",
};

const rauwButtonPromotionDetailConfig: ButtonConfig = {
    label: "Promotion Detail",
    ariaLabel: "Promotion Detail",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "PromotionDetailIcon",
    variant: "default",
};

const rawButtonConfig: ButtonConfigRecord = {
    ADD: rauwButtonAddConfig,
    VIEW: rawButtonViewConfig,
    AR: rawButtonArConfig,
    PROMOTION_DETAIL: rauwButtonPromotionDetailConfig,
};

export const buttonConfig = ButtonsConfigSchema.parse(rawButtonConfig);
