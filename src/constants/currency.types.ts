import { z } from "zod";

export const CurrencySchema = z.enum([
  "PEN",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CNY",
  "CAD",
  "AUD",
  "CHF",
  "SEK",
  "NZD",
]);

export const currencySymbols: Record<Currency, string> = {
  PEN: "S/.",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  CAD: "$",
  AUD: "$",
  CHF: "CHF",
  SEK: "kr",
  NZD: "$",
};

export type Currency = z.infer<typeof CurrencySchema>;
