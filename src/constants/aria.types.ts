
import { z } from "zod";

export const AriaLiveSchema = z.enum(["off", "assertive", "polite"]);
export const AriaRoleSchema = z.enum([
  "button",
  "link",
  "checkbox",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "progressbar",
  "radio",
  "slider",
  "spinbutton",
  "switch",
  "tab",
  "tablist",
  "textbox",
  "treeitem",
]);

