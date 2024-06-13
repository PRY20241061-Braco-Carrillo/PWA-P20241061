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
      redirect: false
    });
    console.warn("result", result);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/" + locale);
    }
  };

  return (
    <PageLayout title={t("title")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 300,
        }}
      >
        <Label>
          <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
            {t("email")}
          </span>
          <Input 
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t("invalidEmail"),
              },
            })}
            type="text"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </Label>
        <Label>
          <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>
            {t("password")}
          </span>
          <Input 
            {...register("password", { required: t("passwordRequired") })}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </Label>
        {error && <p>{t("error", { error })}</p>}
        <Button type="submit">{t("submit")}</Button>
      </form>
    </PageLayout>
  );
}
