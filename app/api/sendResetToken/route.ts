import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email template with placeholders for password reset
const emailTemplate = (resetUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    color: #333;
    margin: 0;
    padding: 0;
  }
  .email-container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 8px;
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
  .reset-button {
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
    background-color: #f9f9f9;
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
    <h2>Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password associated with your account. If you made this request, please click the button below to reset your password:</p>
    <a href="${resetUrl}" class="reset-button">Reset Password</a>
    <p>If the button above doesn’t work, please copy and paste the following link into your browser:</p>
    <p><a href="${resetUrl}" style="color: #1e90ff;">${resetUrl}</a></p>
    <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns about your account’s security.</p>
  </div>
  
  <div class="footer">
    <p>Need assistance? <a href="mailto:support@heroeducation.com">Contact Support</a></p>
    <p>&copy; 2024 Hero Education & Job Consultancy. All rights reserved.</p>
  </div>
</div>

</body>
</html>
`;

// Function to send the password reset email
export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();
    const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;

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
      subject: "Password Reset Request",
      html: emailTemplate(resetUrl), // Inject the reset URL into the template
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      status: 200,
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to send password reset email.",
    });
  }
}
