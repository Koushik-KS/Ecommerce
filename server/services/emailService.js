
const nodemailer = require("nodemailer");

// =====================================================
// GMAIL SMTP TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",

  port: Number(process.env.EMAIL_PORT) || 465,

  secure:
    String(process.env.EMAIL_SECURE).toLowerCase() ===
    "true",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// =====================================================
// SEND ADMIN REPLY EMAIL
// =====================================================

const sendAdminReplyEmail = async ({
  customerName,
  customerEmail,
  originalMessage,
  adminReply,
  orderId,
}) => {
  // Validate customer email
  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  // Validate Gmail credentials
  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is missing in .env");
  }

  if (!process.env.EMAIL_PASSWORD) {
    throw new Error(
      "EMAIL_PASSWORD is missing in .env"
    );
  }

  // Email subject
  const subject = orderId
    ? `Reply from Ecommerce - Order ${orderId}`
    : "Reply from Ecommerce";

  // =====================================================
  // EMAIL OPTIONS
  // =====================================================

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"Ecommerce" <${process.env.EMAIL_USER}>`,

    to: customerEmail,

    subject,

    // ===================================================
    // PLAIN TEXT EMAIL
    // ===================================================

    text: `
Hello ${customerName || "Customer"},

Thank you for contacting Ecommerce.

${
  orderId
    ? `Order ID: ${orderId}\n`
    : ""
}

Your original message:
${originalMessage || "N/A"}

Admin reply:
${adminReply}

If you have any further questions, please contact us.

Thank you,
Ecommerce Team
`,

    // ===================================================
    // HTML EMAIL
    // ===================================================

    html: `
      <div style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 650px;
        margin: auto;
        padding: 20px;
      ">

        <div style="
          background: #2563eb;
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        ">
          <h2 style="margin: 0;">
            Ecommerce
          </h2>

          <p style="margin: 5px 0 0;">
            Customer Support
          </p>
        </div>

        <div style="
          border: 1px solid #ddd;
          border-top: none;
          padding: 20px;
          border-radius: 0 0 10px 10px;
        ">

          <p>
            Hello ${customerName || "Customer"},
          </p>

          <p>
            Thank you for contacting Ecommerce.
          </p>

          ${
            orderId
              ? `
                <p>
                  <strong>Order ID:</strong>
                  ${orderId}
                </p>
              `
              : ""
          }

          <h3 style="color: #2563eb;">
            Your Original Message
          </h3>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            white-space: pre-wrap;
          ">
            ${originalMessage || "N/A"}
          </div>

          <h3 style="color: #16a34a;">
            Admin Reply
          </h3>

          <div style="
            background: #f0fdf4;
            border-left: 4px solid #16a34a;
            padding: 15px;
            border-radius: 8px;
            white-space: pre-wrap;
          ">
            ${adminReply}
          </div>

          <p style="margin-top: 25px;">
            If you have any further questions, please contact us.
          </p>

          <p>
            Thank you,<br />
            <strong>Ecommerce Team</strong>
          </p>

        </div>

        <p style="
          text-align: center;
          color: #888;
          font-size: 12px;
          margin-top: 20px;
        ">
          This is an automated email from Ecommerce.
        </p>

      </div>
    `,
  };

  // =====================================================
  // SEND EMAIL
  // =====================================================

  const info = await transporter.sendMail(mailOptions);

  console.log(
    "Email sent successfully:",
    info.messageId
  );

  return info;
};

// =====================================================
// VERIFY EMAIL CONNECTION
// =====================================================

const verifyEmailConnection = async () => {
  try {
    await transporter.verify();

    console.log(
      "Gmail SMTP connection is ready."
    );

    return true;
  } catch (error) {
    console.error(
      "Gmail SMTP connection failed:",
      error.message
    );

    return false;
  }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
  sendAdminReplyEmail,
  verifyEmailConnection,
};