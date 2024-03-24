import { ButtonConfig, ButtonConfigRecord, ButtonsConfigSchema } from "./menu-button.types";



const rauwButtonAddConfig: ButtonConfig = {
    label: "Add",
    ariaLabel: "Add",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "AddIcon",
    variant: "default",
};

const rawButtonViewConfig: ButtonConfig = {
    label: "View",
    ariaLabel: "View",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "ViewIcon",
    variant: "default",
};

const rawButtonConfig: ButtonConfigRecord = {
    ADD: rauwButtonAddConfig,
    VIEW: rawButtonViewConfig,
};

export const buttonConfig = ButtonsConfigSchema.parse(rawButtonConfig);
