import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email template with placeholders
const emailTemplate = (verificationUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f3f4f6;
    color: #333;
    margin: 0;
    padding: 0;
  }
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .header {
    background-color: #1e90ff;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
  }
  .content {
    padding: 20px;
    font-size: 16px;
    line-height: 1.5;
    color: #555555;
  }
  .content h2 {
    font-size: 20px;
    color: #1e90ff;
  }
  .verify-button {
    display: inline-block;
    padding: 12px 24px;
    margin: 20px 0;
    background-color: #1e90ff;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
  }
  .footer {
    background-color: #f3f4f6;
    padding: 20px;
    font-size: 12px;
    color: #888888;
    text-align: center;
  }
  .footer a {
    color: #1e90ff;
    text-decoration: none;
  }
</style>
</head>
<body>

<div class="email-container">
  <div class="header">
    <h1>Hero Education & Job Consultancy</h1>
  </div>
  
  <div class="content">
    <h2>Hello!</h2>
    <p>Thank you for signing up with <strong>Hero Education & Job Consultancy</strong>. We’re excited to help you on your journey toward educational and career success.</p>
    <p>To get started, please verify your email address by clicking the button below:</p>
    <a href="${verificationUrl}" class="verify-button">Verify Email</a>
    <p>If the button above doesn’t work, please copy and paste the following link into your browser:</p>
    <p><a href="${verificationUrl}" style="color: #1e90ff;">${verificationUrl}</a></p>
    <p>If you did not create an account with us, please ignore this email.</p>
  </div>
  
  <div class="footer">
    <p>Need help? <a href="mailto:{support@heroeducation.com}">Contact Support</a></p>
    <p>&copy; 2024 Hero Education & Job Consultancy. All rights reserved.</p>
  </div>
</div>

</body>
</html>
`;

// Function to send the email
export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();
    const verificationUrl = `${process.env.BASE_URL}/activate/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Hero Education & Job Consultancy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: emailTemplate(verificationUrl), // Inject the verification URL into the template
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 200,
      message: "Verification email sent successfully.",
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to send verification email.",
    });
  }
}
