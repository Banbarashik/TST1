"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData) {
  const { data } = await resend.emails.send({
    from: "next@zao-tst.ru",
    to: "odinokiyskitalec@gmail.com",
    subject: "Test",
    html: `<p>${formData.email}<p>`,
  });

  console.log(data);
}
