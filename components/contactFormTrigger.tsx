"use client";

import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { X } from "lucide-react";

import ContactForm from "@/components/contactForm";
import { Button } from "@/components/ui/button";

export default function ContactFormTrigger({
  triggerBtnVariant = "unstyled",
  triggerBtnSize = "unset",
  triggerBtnClassName = "",
  amountClassName = "",
  hasCloseBtn = false,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { selected } = useProductSelection();

  const selectedProductsAmount = selected.reduce(
    (amount, selectedProduct) => amount + selectedProduct.amount,
    0,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className={`${triggerBtnClassName} relative`}
          size={triggerBtnSize}
          variant={triggerBtnVariant}
        >
          Подать заявку
          {isMounted && selectedProductsAmount > 0 && (
            <span className={amountClassName}>{selectedProductsAmount}</span>
          )}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content
          data-menu-ignore-close="true"
          className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-screen translate-x-[-50%] translate-y-[-50%] gap-4 overflow-y-hidden rounded-lg border shadow-lg duration-200 sm:max-w-xl"
        >
          <VisuallyHidden>
            <Dialog.Title>Заявка</Dialog.Title>
          </VisuallyHidden>
          <ContactForm />
          {hasCloseBtn && (
            <Dialog.Close className="absolute top-2 right-4 bg-white">
              <X
                width={30}
                height={30}
                color="var(--color-primary-darker)"
                strokeWidth={3}
              />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
