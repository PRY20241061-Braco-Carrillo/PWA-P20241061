
import { Currency, CurrencySchema, currencySymbols } from "@/src/constants/currency.types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getCurrencySymbol = (currency: Currency): string => {
  
  const validation = CurrencySchema.safeParse(currency);
  if (!validation.success) {
    throw new Error("Invalid currency type");
  }
  
  return currencySymbols[currency];
};


