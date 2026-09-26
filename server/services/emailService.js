const nodemailer = require("nodemailer");

// =====================================================
// GMAIL SMTP TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",

  port: Number(process.env.EMAIL_PORT) || 465,

  secure:
    String(process.env.EMAIL_SECURE).toLowerCase() === "true",

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
  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is missing in .env");
  }

  if (!process.env.EMAIL_PASSWORD) {
    throw new Error("EMAIL_PASSWORD is missing in .env");
  }

  const subject = orderId
    ? `Reply from Ecommerce - Order ${orderId}`
    : "Reply from Ecommerce";

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"Ecommerce" <${process.env.EMAIL_USER}>`,

    to: customerEmail,

    subject,

    text: `
Hello ${customerName || "Customer"},

Thank you for contacting Ecommerce.

${orderId ? `Order ID: ${orderId}\n` : ""}

Your original message:
${originalMessage || "N/A"}

Admin reply:
${adminReply}

If you have any further questions, please contact us.

Thank you,
Ecommerce Team
`,

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

  const info = await transporter.sendMail(mailOptions);

  console.log(
    "Email sent successfully:",
    info.messageId
  );

  return info;
};

// =====================================================
// SEND ORDER CONFIRMATION EMAIL
// =====================================================

const sendOrderConfirmationEmail = async ({
  customerName,
  customerEmail,
  orderId,
  items,
  subtotal,
  deliveryCharge,
  total,
}) => {
  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is missing in .env");
  }

  if (!process.env.EMAIL_PASSWORD) {
    throw new Error("EMAIL_PASSWORD is missing in .env");
  }

  const safeItems = Array.isArray(items) ? items : [];

  const itemText = safeItems
    .map((item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;

      return `${item.name || "Product"} x ${quantity} = ₹${(
        price * quantity
      ).toFixed(2)}`;
    })
    .join("\n");

  const itemHtml = safeItems
    .map((item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;

      return `
        <tr>

          <td style="
            padding: 10px;
            border-bottom: 1px solid #ddd;
          ">
            ${item.name || "Product"}
          </td>

          <td style="
            padding: 10px;
            border-bottom: 1px solid #ddd;
          ">
            ${quantity}
          </td>

          <td style="
            padding: 10px;
            border-bottom: 1px solid #ddd;
          ">
            ₹${(price * quantity).toFixed(2)}
          </td>

        </tr>
      `;
    })
    .join("");

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"Ecommerce" <${process.env.EMAIL_USER}>`,

    to: customerEmail,

    subject: `Order Confirmation - ${orderId}`,

    text: `
Hello ${customerName || "Customer"},

Thank you for placing your order with Ecommerce.

Your order has been received successfully.

Order ID: ${orderId}

Items:
${itemText}

Subtotal: ₹${Number(subtotal || 0).toFixed(2)}
Delivery Charge: ₹${Number(deliveryCharge || 0).toFixed(2)}
Total: ₹${Number(total || 0).toFixed(2)}

Please keep your Order ID for tracking.

Thank you,
Ecommerce Team
`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 650px;
        margin: auto;
        padding: 20px;
        color: #333;
      ">

        <div style="
          background: #2563eb;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        ">

          <h2>
            Order Confirmation
          </h2>

          <p>
            Thank you for shopping with Ecommerce
          </p>

        </div>

        <div style="
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 0 0 10px 10px;
        ">

          <p>
            Hello ${customerName || "Customer"},
          </p>

          <p>
            Your order has been received successfully.
          </p>

          <h3>
            Order Details
          </h3>

          <p>
            <strong>Order ID:</strong>
            ${orderId}
          </p>

          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          ">

            <thead>

              <tr style="
                background: #f3f4f6;
              ">

                <th style="
                  padding: 10px;
                  text-align: left;
                ">
                  Product
                </th>

                <th style="
                  padding: 10px;
                  text-align: left;
                ">
                  Quantity
                </th>

                <th style="
                  padding: 10px;
                  text-align: left;
                ">
                  Price
                </th>

              </tr>

            </thead>

            <tbody>
              ${itemHtml}
            </tbody>

          </table>

          <p>
            <strong>Subtotal:</strong>
            ₹${Number(subtotal || 0).toFixed(2)}
          </p>

          <p>
            <strong>Delivery Charge:</strong>
            ₹${Number(deliveryCharge || 0).toFixed(2)}
          </p>

          <h3 style="color: #16a34a;">
            Total:
            ₹${Number(total || 0).toFixed(2)}
          </h3>

          <p>
            Please keep your Order ID for tracking your order.
          </p>

          <p>
            Thank you,<br />
            <strong>Ecommerce Team</strong>
          </p>

        </div>

      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(
    "Order confirmation email sent:",
    info.messageId
  );

  return info;
};

// =====================================================
// SEND FORGOT PASSWORD OTP EMAIL
// =====================================================

const sendPasswordResetOTPEmail = async ({
  customerName,
  customerEmail,
  otp,
}) => {
  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is missing in .env");
  }

  if (!process.env.EMAIL_PASSWORD) {
    throw new Error("EMAIL_PASSWORD is missing in .env");
  }

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"Ecommerce" <${process.env.EMAIL_USER}>`,

    to: customerEmail,

    subject: "Ecommerce - Password Reset OTP",

    text: `
Hello ${customerName || "Customer"},

We received a request to reset your Ecommerce account password.

Your password reset OTP is:

${otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email.

Thank you,
Ecommerce Team
`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        color: #333;
      ">

        <div style="
          background: #2563eb;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        ">

          <h2 style="margin: 0;">
            Ecommerce
          </h2>

          <p style="margin: 5px 0 0;">
            Password Reset
          </p>

        </div>

        <div style="
          border: 1px solid #ddd;
          border-top: none;
          padding: 25px;
          border-radius: 0 0 10px 10px;
        ">

          <p>
            Hello ${customerName || "Customer"},
          </p>

          <p>
            We received a request to reset your Ecommerce
            account password.
          </p>

          <p>
            Your password reset OTP is:
          </p>

          <div style="
            text-align: center;
            background: #f3f4f6;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          ">

            <span style="
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #2563eb;
            ">
              ${otp}
            </span>

          </div>

          <p>
            <strong>This OTP is valid for 10 minutes.</strong>
          </p>

          <p>
            If you did not request a password reset,
            please ignore this email.
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

  const info = await transporter.sendMail(mailOptions);

  console.log(
    "Password reset OTP email sent:",
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
  sendOrderConfirmationEmail,
  sendPasswordResetOTPEmail,
  verifyEmailConnection,
};