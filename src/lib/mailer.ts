import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(email: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Barakah Travels Newsletter!',
    html: `<h2>Welcome!</h2><p>Thank you for signing up for Barakah Travels newsletter. You will receive updates, offers, and promotions directly in your inbox.</p><p>Barakah Travels Team</p>`
  });
}
