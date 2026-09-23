
import { useState } from "react";
import Button from "@mui/material/Button";

const API_URL = "http://localhost:4000/api/messages";

const Contact = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    orderId: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT CONTACT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !formData.customerName.trim() ||
      !formData.customerEmail.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage(
        "Please fill in your name, email and message."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          customerEmail: formData.customerEmail.trim(),
          orderId: formData.orderId.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message."
        );
      }

      setSuccessMessage(
        "Your message has been sent successfully. Our team will contact you soon."
      );

      setFormData({
        customerName: "",
        customerEmail: "",
        orderId: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contactPage">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-5 shadow-sm">
              <div className="text-center mb-4">
                <h2 className="hd">
                  Contact Us
                </h2>

                <p className="text-muted">
                  Have a question or need help?
                  Send us a message.
                </p>
              </div>

              {successMessage && (
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* CUSTOMER NAME */}
                <div className="form-group mb-3">
                  <label htmlFor="customerName">
                    Full Name
                  </label>

                  <input
                    id="customerName"
                    type="text"
                    name="customerName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* CUSTOMER EMAIL */}
                <div className="form-group mb-3">
                  <label htmlFor="customerEmail">
                    Email Address
                  </label>

                  <input
                    id="customerEmail"
                    type="email"
                    name="customerEmail"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ORDER ID */}
                <div className="form-group mb-3">
                  <label htmlFor="orderId">
                    Order ID
                    <span className="text-muted">
                      {" "}
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="orderId"
                    type="text"
                    name="orderId"
                    className="form-control"
                    placeholder="Enter order ID if applicable"
                    value={formData.orderId}
                    onChange={handleChange}
                  />
                </div>

                {/* MESSAGE */}
                <div className="form-group mb-4">
                  <label htmlFor="message">
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="6"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="btn-blue btn-lg btn-big btn-round"
                    disabled={loading}
                  >
                    {loading
                      ? "Sending..."
                      : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;