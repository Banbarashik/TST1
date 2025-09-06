"use client";

import { productData } from "@/data/products";

import React, { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

import { SelectedProduct } from "@/types";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { getTotalPrice } from "@/lib/totalPrice";
import { loadFormData, removeFormData, saveFormData } from "@/lib/localStorage";
import { sendEmail } from "@/lib/sendEmail";

import { Checkbox } from "@/components/ui/checkbox";
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
import Link from "next/link";

// Allowed file types/extensions
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel.sheet.macroEnabled.12", // .xlsm
  "application/vnd.ms-excel", // .xls
  "application/x-rar-compressed", // .rar
  "application/zip", // .zip
];
const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".docx",
  ".xlsx",
  ".xlsm",
  ".xls",
  ".rar",
  ".zip",
];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_FILES = 10; // Maximum number of files

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
  files: z.any().optional(),
  consent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "Вы должны принять условия обработки данных",
    }),
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
  const formId = useId();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Add state for selected files
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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
      consent: false,
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setSent(false);

    // Convert products to human-readable form
    const readableProducts = values.products
      .map((p) => {
        const product = findProductOrVariantById(productData, p.id);
        return `${product.name}, количество: ${p.amount}`;
      })
      .join("; ");

    // Read files as base64
    let attachments = [];
    if (selectedFiles.length > 0) {
      attachments = await Promise.all(
        selectedFiles.map(async (file: File) => {
          const buffer = await file.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          return {
            filename: file.name,
            content: base64,
          };
        }),
      );
    }

    try {
      await sendEmail({ ...values, products: readableProducts, attachments });
      setSent(true);

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
        files: undefined,
      });

      // Clear file input and file list
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Optionally clear localStorage after successful submit:
      if (!outOfContext && typeof window !== "undefined") {
        removeFormData();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Handler for file input change with validation and file count limit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    let errorMsg = "";
    const validFiles: File[] = [];

    // Check if adding these files would exceed the limit
    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`Можно прикрепить не более ${MAX_FILES} файлов.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    Array.from(files).forEach((file) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errorMsg = `Файл "${file.name}" превышает 25 МБ.`;
        return;
      }
      // Check file type by MIME or extension
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (
        !ALLOWED_TYPES.includes(file.type) &&
        !ALLOWED_EXTENSIONS.includes(ext)
      ) {
        errorMsg = `Недопустимый тип файла: "${file.name}".`;
        return;
      }
      validFiles.push(file);
    });

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
      setSelectedFiles((prev) => {
        const newFiles = validFiles.filter(
          (file) =>
            !prev.some(
              (f) =>
                f.name === file.name &&
                f.size === file.size &&
                f.lastModified === file.lastModified,
            ),
        );
        return [...prev, ...newFiles];
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handler for removing a file from the list
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // Clear error if file count is now within the limit
      if (updated.length <= MAX_FILES) {
        setError(null);
      }
      return updated;
    });
  };

  // Handler for clearing all files
  const handleClearFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 8. Render the form
  return (
    <Card className="max-h-screen w-full max-w-xl overflow-y-scroll">
      <CardContent>
        <Form {...form}>
          <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
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
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Вложения</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          multiple
                          accept={ALLOWED_EXTENSIONS.join(",")}
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleClearFiles}
                        >
                          Очистить
                        </Button>
                      </div>
                      {/* Show list of selected files */}
                      {selectedFiles.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {selectedFiles.map((file, idx) => (
                            <li
                              key={file.name + file.size + file.lastModified}
                              className="flex items-center gap-2"
                            >
                              <span className="truncate">{file.name}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveFile(idx)}
                              >
                                ✕
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={(val) => field.onChange(!!val)}
                      aria-required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel
                      className="mb-2 font-normal"
                      style={{ color: "black" }}
                    >
                      <div>
                        Нажимая на кнопку Вы соглашаетесь с{" "}
                        <Link
                          href="/personal-data"
                          target="_blank"
                          className="text-blue-700"
                        >
                          политикой обработки персональных данных
                        </Link>
                      </div>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        {sent && (
          <div className="font-bold text-green-600">
            Заявка успешно отправлена!
          </div>
        )}
        {error && <div className="font-bold text-red-600">{error}</div>}
      </CardContent>
      <CardFooter className="flex">
        <Button type="submit" form={formId} disabled={loading}>
          {loading ? "Отправка..." : "Оставить заявку"}
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
