"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
  try {
    const { error } = await resend.emails.send({
      from: "site@zao-tst.ru",
      to: "odinokiyskitalec@gmail.com",
      subject: "Заявка",
      html: `
      <p>Имя: ${formData.username}</p>
      <p>Название организации: ${formData.company}</p>
      <p>E-mail: ${formData.email}<p>
      <p>Регион, город: ${formData.region}<p>
      <p>Интересующие товары: ${formData.products}<p>
      <p>Сообщение: ${formData.message}<p>`,
      attachments: formData.attachments?.map((file) => ({
        filename: file.filename,
        content: file.content,
      })),
    });

    if (error) throw new Error(error.message);
  } catch {
    throw new Error("Ошибка отправки. Попробуйте еще раз.");
  }
}
