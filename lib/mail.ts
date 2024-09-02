import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.BASE_PATH}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Email",
    html: `<p> please click the following Link for the confirmation <a href=${confirmationLink}>Confirm Your Email</a></p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.BASE_PATH}/auth/new-reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your Email for changing the password",
    html: `<p> please click the following Link for the confirmation <a href=${confirmationLink}>Confirm Your Email</a></p>`,
  });
};
