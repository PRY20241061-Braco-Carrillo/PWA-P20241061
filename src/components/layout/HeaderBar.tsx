"use client";

import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const locale = useLocale();

  const { data: session } = useSession();
  const t = useTranslations('HeaderBar');
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const handleOrders = () => {
    router.push("/" + locale );
  }

  const handleReservations = () => {
    router.push("/reservations");
  }

  return (
    <div className="header-bar">
      {session && (
        <Button onClick={handleLogout}>
          {t("logout")}
        </Button>
      )}
{session && (
        <Button onClick={handleOrders}>
          {t("orders")}
        </Button>
      )}

{session && (
        <Button onClick={handleReservations}>
          {t("reservations")}
        </Button>
      )}
    </div>
  );
}
