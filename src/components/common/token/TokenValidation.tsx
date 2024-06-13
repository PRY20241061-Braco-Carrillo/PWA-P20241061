"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";
import "./styles.css";

interface TokenFormValues {
  token: string;
}

const ValidationTokenButton = () => {
  const { register, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm<TokenFormValues>();
  const token = watch("token");
  const isTokenValid = /^[0-9]{6}$/.test(token);
  const t = useTranslations("ValidationTokenButton");

  const onSubmit = (data: TokenFormValues) => {
    console.log("Token submitted:", data.token);
    reset();
  };

  const handleDialogClose = () => {
    reset();
  };

  return (
    <Dialog.Root onOpenChange={handleDialogClose}>
      <Dialog.Trigger asChild>
        <Button className="Button violet">{t("buttonText")}</Button>
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
