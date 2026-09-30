const { Resend } = require("resend");

// =====================================================
// RESEND EMAIL CLIENT
// =====================================================

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is missing.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// =====================================================
// EMAIL CONFIGURATION
// =====================================================

const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const EMAIL_ADMIN =
  process.env.RESEND_ADMIN_EMAIL;

// =====================================================
// HELPER - CHECK EMAIL CONFIGURATION
// =====================================================

const checkEmailConfiguration = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing in Render environment."
    );
  }

  if (!EMAIL_ADMIN) {
    throw new Error(
      "RESEND_ADMIN_EMAIL is missing in Render environment."
    );
  }

  if (!EMAIL_FROM) {
    throw new Error(
      "RESEND_FROM_EMAIL is missing in Render environment."
    );
  }
};

// =====================================================
// SEND CUSTOMER CONTACT MESSAGE TO ADMIN
// =====================================================

const sendContactMessageToAdmin = async ({
  customerName,
  customerEmail,
  orderId,
  message,
}) => {
  checkEmailConfiguration();

  if (!customerName) {
    throw new Error("Customer name is missing.");
  }

  if (!customerEmail) {
    throw new Error("Customer email is missing.");
  }

  if (!message) {
    throw new Error("Customer message is missing.");
  }

  const subject = orderId
    ? `New Customer Message - Order ${orderId}`
    : "New Customer Contact Message";

  const text = `
Hello Ecommerce Admin,

You have received a new message from a customer.

Customer Name:
${customerName}

Customer Email:
${customerEmail}

${orderId ? `Order ID:\n${orderId}\n\n` : ""}

Customer Message:
${message}

Please log in to the Ecommerce Admin Dashboard to view and manage this message.

Thank you,
Ecommerce System
`;

  const html = `
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
          New Customer Message
        </p>

      </div>

      <div style="
        border: 1px solid #ddd;
        border-top: none;
        padding: 20px;
        border-radius: 0 0 10px 10px;
      ">

        <h3 style="color: #2563eb;">
          Customer Details
        </h3>

        <p>
          <strong>Name:</strong>
          ${customerName}
        </p>

        <p>
          <strong>Email:</strong>
          ${customerEmail}
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
          Customer Message
        </h3>

        <div style="
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          white-space: pre-wrap;
          margin-bottom: 20px;
        ">
          ${message}
        </div>

        <p>
          Please log in to the Ecommerce Admin Dashboard
          to view and manage this message.
        </p>

        <p>
          Thank you,<br />
          <strong>Ecommerce System</strong>
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
  `;

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [EMAIL_ADMIN],
    replyTo: customerEmail,
    subject,
    text,
    html,
  });

  if (error) {
    console.error(
      "Resend contact email error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to send contact email."
    );
  }

  console.log(
    "Customer contact email sent successfully:",
    data?.id
  );

  return data;
};

// =====================================================
// SEND ADMIN REPLY EMAIL TO CUSTOMER
// =====================================================

const sendAdminReplyEmail = async ({
  customerName,
  customerEmail,
  originalMessage,
  adminReply,
  orderId,
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing in Render environment."
    );
  }

  if (!customerEmail) {
    throw new Error(
      "Customer email is missing."
    );
  }

  if (!EMAIL_FROM) {
    throw new Error(
      "RESEND_FROM_EMAIL is missing in Render environment."
    );
  }

  const subject = orderId
    ? `Reply from Ecommerce - Order ${orderId}`
    : "Reply from Ecommerce";

  const text = `
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
`;

  const html = `
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
          If you have any further questions,
          please contact us.
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
  `;

  const { data, error } =
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [customerEmail],
      subject,
      text,
      html,
    });

  if (error) {
    console.error(
      "Resend admin reply email error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to send reply email."
    );
  }

  console.log(
    "Admin reply email sent successfully:",
    data?.id
  );

  return data;
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
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing."
    );
  }

  if (!customerEmail) {
    throw new Error(
      "Customer email is missing."
    );
  }

  if (!EMAIL_FROM) {
    throw new Error(
      "RESEND_FROM_EMAIL is missing."
    );
  }

  const safeItems =
    Array.isArray(items) ? items : [];

  const itemText = safeItems
    .map((item) => {
      const quantity =
        Number(item.quantity) || 0;

      const price =
        Number(item.price) || 0;

      return `${
        item.name || "Product"
      } x ${quantity} = ₹${(
        price * quantity
      ).toFixed(2)}`;
    })
    .join("\n");

  const itemHtml = safeItems
    .map((item) => {
      const quantity =
        Number(item.quantity) || 0;

      const price =
        Number(item.price) || 0;

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
            ₹${(
              price * quantity
            ).toFixed(2)}
          </td>

        </tr>
      `;
    })
    .join("");

  const text = `
Hello ${customerName || "Customer"},

Thank you for placing your order with Ecommerce.

Your order has been received successfully.

Order ID: ${orderId}

Items:
${itemText}

Subtotal: ₹${Number(
    subtotal || 0
  ).toFixed(2)}

Delivery Charge: ₹${Number(
    deliveryCharge || 0
  ).toFixed(2)}

Total: ₹${Number(
    total || 0
  ).toFixed(2)}

Please keep your Order ID for tracking.

Thank you,
Ecommerce Team
`;

  const html = `
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
          ₹${Number(
            subtotal || 0
          ).toFixed(2)}
        </p>

        <p>
          <strong>Delivery Charge:</strong>
          ₹${Number(
            deliveryCharge || 0
          ).toFixed(2)}
        </p>

        <h3 style="color: #16a34a;">
          Total:
          ₹${Number(
            total || 0
          ).toFixed(2)}
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
  `;

  const { data, error } =
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [customerEmail],
      subject: `Order Confirmation - ${orderId}`,
      text,
      html,
    });

  if (error) {
    console.error(
      "Resend order email error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to send order confirmation email."
    );
  }

  console.log(
    "Order confirmation email sent:",
    data?.id
  );

  return data;
};

// =====================================================
// SEND FORGOT PASSWORD OTP EMAIL
// =====================================================

const sendPasswordResetOTPEmail = async ({
  customerName,
  customerEmail,
  otp,
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is missing."
    );
  }

  if (!customerEmail) {
    throw new Error(
      "Customer email is missing."
    );
  }

  if (!EMAIL_FROM) {
    throw new Error(
      "RESEND_FROM_EMAIL is missing."
    );
  }

  const text = `
Hello ${customerName || "Customer"},

We received a request to reset your Ecommerce account password.

Your password reset OTP is:

${otp}

This OTP is valid for 10 minutes.

If you did not request a password reset, please ignore this email.

Thank you,
Ecommerce Team
`;

  const html = `
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
          <strong>
            This OTP is valid for 10 minutes.
          </strong>
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
  `;

  const { data, error } =
    await resend.emails.send({
      from: EMAIL_FROM,
      to: [customerEmail],
      subject:
        "Ecommerce - Password Reset OTP",
      text,
      html,
    });

  if (error) {
    console.error(
      "Resend OTP email error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to send OTP email."
    );
  }

  console.log(
    "Password reset OTP email sent:",
    data?.id
  );

  return data;
};

// =====================================================
// VERIFY RESEND CONNECTION
// =====================================================

const verifyEmailConnection = async () => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "RESEND_API_KEY is missing."
      );
    }

    const { error } =
      await resend.domains.list();

    if (error) {
      throw new Error(
        error.message ||
          "Resend connection failed."
      );
    }

    console.log(
      "Resend API connection verified successfully."
    );

    return true;
  } catch (error) {
    console.error(
      "Resend API connection failed:",
      error.message
    );

    return false;
  }
};

// =====================================================
// EXPORT FUNCTIONS
// =====================================================

module.exports = {
  sendContactMessageToAdmin,
  sendAdminReplyEmail,
  sendOrderConfirmationEmail,
  sendPasswordResetOTPEmail,
  verifyEmailConnection,
};