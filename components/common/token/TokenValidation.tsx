"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface TokenFormValues {
  token: string;
}

const ValidationTokenButton = () => {
  const { register, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm<TokenFormValues>();
  const token = watch("token");
  const isTokenValid = /^[0-9]{6}$/.test(token);

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
        <Button className="Button violet">ValidationToken</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Enter Your Token</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Please enter your 6-digit token.
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="token">
                Token
              </label>
              <Input
                id="token"
                type="text"
                {...register("token", {
                  required: "Token is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Token must be a 6-digit number",
                  },
                })}
                className={`Input ${errors.token ? "border-red-500" : ""}`}
                placeholder="Enter your token"
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
                Validate
              </Button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ValidationTokenButton;
