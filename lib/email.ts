import nodemailer from "nodemailer";

const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

export const sendContactEmail = async (payload: {
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "";
  const to = process.env.SMTP_TO ?? process.env.SMTP_FROM ?? "";

  await transporter.sendMail({
    from,
    to,
    subject: payload.subject,
    html: payload.html,
    replyTo: payload.replyTo,
  });
};
