"use client";

import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function HeaderBar() {
  const t = useTranslations('HeaderBar');
  

  const handleLogout = () => {
    signOut();
  };



  return (
    <div className="header-bar">
      <Button onClick={handleLogout} >
        {t("logout")}
      </Button>
    </div>
  );
}


