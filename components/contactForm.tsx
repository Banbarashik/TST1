"use client";

import { productData } from "@/data/products";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import { SelectedProduct } from "@/types";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { getTotalPrice } from "@/lib/totalPrice";
import { loadFormData, removeFormData, saveFormData } from "@/lib/localStorage";
import { sendEmail } from "@/lib/sendEmail";

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

const formSchema = z.object({
  username: z.string().max(200), // Имя
  company: z.string().max(200), // Название организации
  email: z.email({
    error: (iss) =>
      iss.input === "" || iss.input === undefined
        ? "Обязательное поле"
        : "Некорректная электронная почта",
  }), // E-mail
  region: z.string().max(200), // Регион, город
  products: z.array(
    z.object({
      id: z.string(),
      amount: z.number().min(1),
    }),
  ),
  // .min(1, "Выберите хотя бы один товар"), // Интересующие продукты
  message: z.string().min(1, "Обязательное поле").max(4000), // Сообщение
});

function findProductOrVariantById(products, id: string) {
  for (const product of products) {
    if (product.id === id) return product;
    if (product.variants) {
      const variant = product.variants.find((v) => v.id === id);
      if (variant) return variant;
    }
  }
  return null;
}

export default function ContactForm({
  outOfContext = false /* whether use local state or context */,
}) {
  const context = useProductSelection();

  const [localSelectedProducts, setLocalSelectedProducts] = React.useState<
    SelectedProduct[]
  >([]);
  const localSetProductAmount = (id: string, amount: number) => {
    setLocalSelectedProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item)),
    );
  };

  // 2. Choose which selection state to use
  const selectedProducts = outOfContext
    ? localSelectedProducts
    : context!.selected;
  const setSelectedProducts = outOfContext
    ? setLocalSelectedProducts
    : context!.set;
  const setProductAmount = outOfContext
    ? localSetProductAmount
    : context!.setAmount;

  // 3. Load saved form data from localStorage (only for text fields, not product)
  const getInitialFormData = React.useCallback(() => {
    if (outOfContext || typeof window === "undefined") return undefined;
    try {
      const parsed = loadFormData();
      return {
        username: parsed?.username || "",
        company: parsed?.company || "",
        email: parsed?.email || "",
        region: parsed?.region || "",
        products: selectedProducts, // Always use current selection for product
        message: parsed?.message || "",
      };
    } catch {
      return undefined;
    }
  }, [selectedProducts, outOfContext]);

  // 4. Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialFormData() || {
      username: "",
      company: "",
      email: "",
      region: "",
      products: selectedProducts,
      message: "",
    },
  });

  // 5. Sync form's product field with selection state
  React.useEffect(() => {
    form.setValue(
      "products",
      // Sync local state to form when outOfContext
      !outOfContext ? selectedProducts : localSelectedProducts,
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProducts, localSelectedProducts, outOfContext]);

  // 6. Save form data to localStorage on change (only when using context)
  React.useEffect(() => {
    if (outOfContext) return;

    const subscription = form.watch((values) => {
      if (typeof window !== "undefined") {
        saveFormData({
          ...values,
          products: (values.products ?? []).filter(
            (p): p is SelectedProduct => p !== undefined,
          ),
          email: values.email ?? "",
          message: values.message ?? "",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, outOfContext]);

  // 7. Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert products to human-readable form
    const readableProducts = values.products.map((p) => {
      const product = findProductOrVariantById(productData, p.id);
      return {
        name: product.name,
        amount: p.amount,
      };
    });

    // sendEmail({ ...values, products: readableProducts });
    console.log({ ...values, products: readableProducts });

    // Clear product selection BEFORE resetting the form
    if (outOfContext) {
      setLocalSelectedProducts([]);
    } else {
      context?.set([]);
    }

    // Reset the form to its default values
    form.reset({
      username: "",
      company: "",
      email: "",
      region: "",
      products: [],
      message: "",
    });

    // Optionally clear localStorage after successful submit:
    if (!outOfContext && typeof window !== "undefined") {
      removeFormData();
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
              name="products"
              render={() => (
                <FormItem>
                  <FormLabel>Интересующие товары</FormLabel>
                  <FormControl>
                    <ProductMultiSelect
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts} // update context directly
                      setProductAmount={setProductAmount}
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
      <CardFooter className="flex">
        <Button type="submit" form="contactForm">
          Оставить заявку
        </Button>
        {selectedProducts.length > 0 && (
          <p className="ml-auto">
            Итоговая стоимость:{" "}
            {getTotalPrice(selectedProducts).toLocaleString("ru-RU")} руб.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
