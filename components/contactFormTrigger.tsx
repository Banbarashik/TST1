"use client";

import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import * as Dialog from "@radix-ui/react-dialog";

import ContactForm from "@/components/contactForm";
import { Button } from "@/components/ui/button";

export default function ContactFormTrigger() {
  const [isMounted, setIsMounted] = useState(false);
  const { selected } = useProductSelection();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="relative">
          <Button className="h-12 text-xl font-bold" size="lg">
            Подать заявку
          </Button>
          {isMounted && selected.length > 0 && (
            <span className="bg-accent absolute right-0 bottom-0 inline-flex size-6 translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold">
              {selected.length}
            </span>
          )}
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200">
          <ContactForm preselectedProducts={selected} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
