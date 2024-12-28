import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { message, name, email } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER, // Your Gmail address
      pass: process.env.SMTP_PASS, // Your regular Gmail password
    },
  });

  const mailOptions = {
    from: email, // Email from user
    to: process.env.RECEIVER_EMAIL, // Your Gmail address for receiving
    subject: "New Contact Form Submission",
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; border: 1px solid #ddd;">
                <p style="margin: 0; font-weight: bold;">Name:</p>
                <p style="margin: 0; color: #555;">${name}</p>
                
                <p style="margin: 0; font-weight: bold;">Email:</p>
                <p style="margin: 0; color: #555;">${email}</p>
                
                <p style="margin: 0; font-weight: bold;">Message:</p>
                <p style="margin: 0; color: #555;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #777;">This email was sent from your website contact form.</p>
        </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Successfully sent" }, { status: 200 });
  } catch (error) {
    console.log(error);
    console.error("Error sending email");
    return NextResponse.json("Failed to send email");
  }
}
