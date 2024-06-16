"use client";

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function HeaderBar() {
  const { data: session } = useSession();
  const t = useTranslations('HeaderBar');

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="header-bar">
      {session && (
        <Button onClick={handleLogout}>
          {t("logout")}
        </Button>
      )}
    </div>
  );
}
