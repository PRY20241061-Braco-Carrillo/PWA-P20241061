import { Link, usePathname } from "@/src/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "es" : "en";
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {t("switchLocale", { locale: otherLocale })}
    </Link>
  );
}
