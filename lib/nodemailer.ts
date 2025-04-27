import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 host: process.env.EMAIL_SERVER_HOST,
 port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
 secure: false,
 auth: {
  user: process.env.EMAIL_SERVER_USER,
  pass: process.env.EMAIL_SERVER_PASSWORD,
 },
});

export async function sendVerificationEmail(
 email: string,
 otp: string,
 name: string
): Promise<boolean> {
 try {
  await transporter.sendMail({
   from: `"Your App" <${process.env.EMAIL_FROM}>`,
   to: email,
   subject: "Email Verification Code",
   html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${name},</h2>
          <p>Terima kasih telah mendaftar, ini adalah kode verifikasi anda:</p>
          <div style="background: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="margin: 0; letter-spacing: 5px; color: #333;">${otp}</h1>
          </div>
          <p>Kode ini akan kadaluarsa dalam 15 menit.</p>
          <p>Jika anda tidak meminta kode OTP ini, abaikan email ini.</p>
          <p>Best regards,<br/>Codevora Team</p>
        </div>
      `,
  });
  return true;
 } catch (error) {
  console.error("Error sending email:", error);
  return false;
 }
}
