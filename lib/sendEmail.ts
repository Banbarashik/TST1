"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
  try {
    const { error } = await resend.emails.send({
      from: "next@zao-tst.ru",
      to: "odinokiyskitalec@gmail.com",
      subject: "Test",
      html: `<p>${formData.email}<p>`,
    });

    if (error) throw new Error(error.message);
  } catch {
    throw new Error("Ошибка отправки. Попробуйте еще раз.");
  }
}
