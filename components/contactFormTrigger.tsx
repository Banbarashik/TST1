"use client";

import { useProductSelection } from "@/context/ProductSelectionContext";

import * as Dialog from "@radix-ui/react-dialog";

import ContactForm from "@/components/contactForm";
import { Button } from "@/components/ui/button";

export default function ContactFormTrigger() {
  const { selected } = useProductSelection();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button type="button" className="ml-4" disabled={selected.length === 0}>
          Оформить заявку ({selected.length})
        </Button>
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
