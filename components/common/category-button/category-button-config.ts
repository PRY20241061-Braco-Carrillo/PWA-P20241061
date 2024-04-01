
import { CategoryButtonConfig, CategoryButtonConfigRecord, CategoryButtonsConfigSchema } from "./category-button.types";



const rauwButtonSnackCategoryConfig: CategoryButtonConfig = {
    label: "Snacks",
    ariaLabel: "Snacks",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    actionType: "navigate",
    icon: "SnackCategory",
    path: "/snacks/",
};

const rawButtonDrinkCategoryConfig: CategoryButtonConfig = {
    label: "Drinks",
    ariaLabel: "Drinks",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    actionType: "navigate",
    path: "/drinks/",
    icon: "DrinkCategory",
};

const rawButtonDessertCategoryConfig: CategoryButtonConfig = {
    label: "Dessert",
    ariaLabel: "Dessert",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "DessertCategory",
    actionType: "navigate",
    path: "/desserts/",
};

const rawButtonEntryCategoryConfig: CategoryButtonConfig = {
    label: "Entry",
    ariaLabel: "Entry",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "EntryCategory",
    actionType: "navigate",
    path: "/entry/", 
};

const rawButtonKidsCategoryConfig: CategoryButtonConfig = {
    label: "Kids",
    ariaLabel: "Kids",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "KidsCategory",
    actionType: "navigate",
    path: "/kids/", 
};

const rawButtonOfferCategoryConfig: CategoryButtonConfig = {
    label: "Offer",
    ariaLabel: "Offer",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "OfferCategory",
    actionType: "navigate",
    path: "/offer/", 
};


const rawButtonTrendCategoryConfig: CategoryButtonConfig = {
    label: "Trend",
    ariaLabel: "Trend",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "TrendCategory",
    actionType: "navigate",
    path: "/trend/", 
};

const rawButtonPrincipalCategoryConfig: CategoryButtonConfig = {
    label: "Principal",
    ariaLabel: "Principal",
    ariaPressed: false,
    ariaExpanded: false,
    disabled: false,
    icon: "PrincipalCategory",
    actionType: "navigate",
    path: "/principal/", 
};

const rawButtonConfig: CategoryButtonConfigRecord = {
    SNACK: rauwButtonSnackCategoryConfig,
    DRINK: rawButtonDrinkCategoryConfig,
    DESSERT: rawButtonDessertCategoryConfig,
    TREND: rawButtonTrendCategoryConfig,
    ENTRY: rawButtonEntryCategoryConfig,
    KIDS: rawButtonKidsCategoryConfig,
    OFFER: rawButtonOfferCategoryConfig,
    
    PRINCIPAL: rawButtonPrincipalCategoryConfig,
};

export const categoryButtonConfig = CategoryButtonsConfigSchema.parse(rawButtonConfig);
