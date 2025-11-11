import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <p>You have a new contact message from <strong>${name}</strong> (${email}):</p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Mail Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
