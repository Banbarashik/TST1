import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

type NumberInputProps = {
  value: number;
  disabled: boolean;
  decrease: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  increase: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  change: React.ChangeEventHandler<HTMLInputElement>;
  className?: {
    root?: string;
    button?: string;
    input?: string;
  };
};

function NumberInput({
  value,
  disabled,
  change,
  decrease,
  increase,
  className,
}: NumberInputProps) {
  return (
    <div
      className={`${className?.root} flex w-fit items-center rounded border`}
    >
      <Button
        disabled={disabled}
        type="button"
        size="icon"
        variant="ghost"
        className={`${className?.button}`}
        onClick={decrease}
        aria-label="Уменьшить"
      >
        –
      </Button>
      <Input
        type="number"
        min={1}
        value={value}
        onChange={change}
        className={`${className?.input} no-spinner w-10 border-0 text-center focus:ring-0`}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className={`${className?.button}`}
        onClick={increase}
        aria-label="Увеличить"
      >
        +
      </Button>
    </div>
  );
}

export { Input, NumberInput };
