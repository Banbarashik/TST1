"use client";

import { products } from "@/data/products";
import { useProductSelection } from "@/context/ProductSelectionContext";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
  product: z.array(z.string()).min(1, "Выберите хотя бы один товар"), // changed
  message: z.string().min(1, "Обязательное поле").max(4000),
});

export default function ContactForm() {
  const { selected, set } = useProductSelection();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      company: "",
      email: "",
      region: "",
      product: selected, // always use context
      message: "",
    },
    values: {
      username: "",
      company: "",
      email: "",
      region: "",
      product: selected, // keep in sync
      message: "",
    },
  });

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
  }

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
