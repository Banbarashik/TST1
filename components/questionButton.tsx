import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import StopAboveFooter from "@/components/utils/stopAboveFooter";
import ContactForm from "@/components/contactForm";
import { Button } from "@/components/ui/button";

export default function QuestionButton() {
  return (
    <Dialog.Root>
      <StopAboveFooter side="left">
        <Dialog.Trigger asChild>
          <Button
            size="xl"
            className="cursor-pointer bg-[#574184] hover:bg-[#7e5ebd]"
          >
            Задать вопрос
          </Button>
        </Dialog.Trigger>
      </StopAboveFooter>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200">
          <VisuallyHidden>
            <Dialog.Title>Заявка</Dialog.Title>
          </VisuallyHidden>
          <ContactForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
