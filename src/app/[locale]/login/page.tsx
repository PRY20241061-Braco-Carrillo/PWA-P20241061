"use client";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import PageLayout from "@/src/components/layout/PageLayout";
import { useState, useEffect } from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Spinner from "@/src/components/ui/spinner";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const locale = useLocale();
  const t = useTranslations("Login");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession(); 

  const onSubmit = async (data: LoginFormInputs) => {
    if (error) setError(undefined);
    setLoading(true);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error.includes("No puedes iniciar sesión con este usuario")) {
        setError("No se permite el acceso para usuarios con el rol 'CLIENTE'");
        reset();
      } else {
        setError(result.error);
        reset();
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.data?.roles?.includes("ROLE_CLIENT")) {
      setError("No se permite el acceso para usuarios con el rol 'CLIENTE'");
      reset(); 
      setLoading(false);
    } else if (status === "authenticated") {

      router.replace("/" + locale);
    }
  }, [status, session, locale, router, reset]);

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <PageLayout title={t("title")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <Label className="block text-sm font-medium text-gray-700">
          {t("email")}
          <Input
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t("invalidEmail"),
              },
            })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </Label>
        <Label className="block text-sm font-medium text-gray-700">
          {t("password")}
          <Input
            {...register("password", { required: t("passwordRequired") })}
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
          )}
        </Label>
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
        <Button
          type="submit"
          className="w-full py-2 mt-4 text-white"
        >
          {t("submit")}
        </Button>
      </form>
    </PageLayout>
  );
}
