"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import { useProductSelection } from "@/context/ProductSelectionContext";
import { products } from "@/data/products";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ProductMultiSelect } from "@/components/productMultiSelect";

// Имя, название организации
// E-mail
// Регион, город
// Интересующий продукт
// Сообщение
const formSchema = z.object({
  username: z.string().max(200),
  company: z.string().max(200),
  email: z.email({
    error: (iss) =>
      iss.input === "" || iss.input === undefined
        ? "Обязательное поле"
        : "Некорректная электронная почта",
  }),
  region: z.string().max(200),
  product: z.array(z.string()).min(1, "Выберите хотя бы один товар"),
  message: z.string().min(1, "Обязательное поле").max(4000),
});

const FORM_STORAGE_KEY = "contactFormData";

export default function ContactForm({
  outOfContext = false /* whether use local state or context */,
}) {
  // 1. Always call both hooks at the top level
  let context;
  try {
    context = useProductSelection();
  } catch {
    context = undefined;
  }
  const [localSelected, setLocalSelected] = React.useState<string[]>([]);

  // 2. Choose which selection state to use
  const selected = outOfContext ? localSelected : context.selected;
  const set = outOfContext ? setLocalSelected : context.set;

  // 3. Load saved form data from localStorage (only for text fields, not product)
  const getInitialFormData = React.useCallback(() => {
    if (outOfContext || typeof window === "undefined") return undefined;
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      return {
        username: parsed.username || "",
        company: parsed.company || "",
        email: parsed.email || "",
        region: parsed.region || "",
        // Always use current selection for product
        product: selected,
        message: parsed.message || "",
      };
    } catch {
      return undefined;
    }
  }, [selected, outOfContext]);

  // 4. Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialFormData() || {
      username: "",
      company: "",
      email: "",
      region: "",
      product: selected,
      message: "",
    },
  });

  // 5. Sync form's product field with selection state
  React.useEffect(() => {
    // Only sync when using context (not outOfContext)
    if (!outOfContext) {
      form.setValue("product", selected, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, outOfContext]);

  // 6. Save form data to localStorage on change (only when using context)
  React.useEffect(() => {
    if (outOfContext) return;
    const subscription = form.watch((values) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, outOfContext]);

  // 7. Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Map product IDs to product names
    const selectedProducts = products.filter((p) =>
      values.product.includes(p.id),
    );
    const humanReadable = {
      ...values,
      product: selectedProducts.map((p) => p.name),
    };
    console.log(humanReadable);
    // send humanReadable instead of values
    // Optionally clear localStorage after successful submit:
    if (!outOfContext && typeof window !== "undefined") {
      localStorage.removeItem(FORM_STORAGE_KEY);
    }
  }

  // 8. Render the form
  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <Form {...form}>
          <form
            id="contactForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название организации</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регион, город</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Интересующие товары</FormLabel>
                  <FormControl>
                    <ProductMultiSelect
                      value={selected}
                      onChange={set} // update context directly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Сообщение</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="contactForm">
          Оставить заявку
        </Button>
      </CardFooter>
    </Card>
  );
}
