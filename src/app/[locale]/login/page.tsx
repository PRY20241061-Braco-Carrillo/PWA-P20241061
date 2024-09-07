"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import PageLayout from "@/src/components/layout/PageLayout";
import { useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const locale = useLocale();
  const t = useTranslations("Login");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    if (error) setError(undefined);
  
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  
    if (result?.error) {
      setError(result.error);
    } else {
      // Redirige al usuario a la página de inicio y asegura que la sesión se vuelva a cargar
      router.replace("/" + locale);
    }
  };
  

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
          <p className="text-sm text-red-600 text-center">{t("error", { error })}</p>
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
