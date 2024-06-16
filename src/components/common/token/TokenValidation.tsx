"use client"

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";
import React from "react";
import "./styles.css";
import { useValidationToken } from "@/src/api/domain/orders/useValidationToken";

interface TokenFormValues {
  token: string;
}

const ValidationTokenButton = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TokenFormValues>();
  const token = watch("token");
  const isTokenValid = /^[0-9]{6}$/.test(token);
  const [submitToken, setSubmitToken] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const t = useTranslations("ValidationTokenButton");

  const { data, error, isLoading, isSuccess, isError } = useValidationToken(submitToken || "");

  const onSubmit = (data: TokenFormValues) => {
    console.log("Token submitted:", data.token);
    setSubmitToken(data.token);
  };

  const handleDialogClose = () => {
    reset();
    setSubmitToken(null); 
    setIsDialogOpen(false);
  };

  React.useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isSuccess:", isSuccess);
    console.log("isError:", isError);
    console.log("Data:", data);
    console.log("Error:", error);

    if (isSuccess) {
      const timer = setTimeout(() => {
        handleDialogClose();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <Button className="Button violet" onClick={() => setIsDialogOpen(true)}>{t("buttonText")}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{t("title")}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {t("description")}
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="token">
                {t("tokenLabel")}
              </label>
              <Input
                id="token"
                type="text"
                {...register("token", {
                  required: t("tokenRequired"),
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: t("tokenPattern"),
                  },
                })}
                className={`Input ${errors.token ? "border-red-500" : ""}`}
                placeholder={t("tokenPlaceholder")}
              />
              {errors.token && (
                <p className="text-red-500 text-sm mt-1">{errors.token.message}</p>
              )}
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <Button
                className="Button green"
                disabled={!isTokenValid}
                type="submit"
              >
                {t("validateButton")}
              </Button>
            </div>
          </form>
          {submitToken && (
            <>
              {isLoading && (
                <div className="ProgressBar">{t("loadingMessage")}</div>
              )}
              {isSuccess && (
                <div className="SuccessMessage">{t("successMessage")}</div>
              )}
              {isError && (
                <div className="ErrorMessage">{t("errorMessage")}</div>
              )}
            </>
          )}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label={t("closeButtonAriaLabel")}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ValidationTokenButton;
