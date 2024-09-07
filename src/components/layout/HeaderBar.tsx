"use client";

import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function HeaderBar() {
  const locale = useLocale();
  const { data: session } = useSession();
  const t = useTranslations('HeaderBar');
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const handleOrders = () => {
    router.push("/" + locale);
  }

  const handleReservations = () => {
    router.push("/reservations");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center text-black text-2xl">
          Yumful
        </div>

        <div className="flex items-center space-x-4">
          {session && (
            <>
              <Button 
                onClick={handleOrders}
                className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors rounded-lg px-4 py-2"
              >
                {t("orders")}
              </Button>
              <Button 
                onClick={handleReservations}
                className="bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors rounded-lg px-4 py-2"
              >
                {t("reservations")}
              </Button>
              <Button 
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors rounded-lg px-4 py-2"
              >
                {t("logout")}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
