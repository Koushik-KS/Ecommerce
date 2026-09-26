import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import { MyContext } from "../../App";

const API_URL = "http://localhost:4000";

function ForgotPassword() {
  const {
    setisHeaderFooterShow,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  // =====================================================
  // HIDE HEADER AND FOOTER
  // =====================================================

  useEffect(() => {
    setisHeaderFooterShow(false);

    return () => {
      setisHeaderFooterShow(true);
    };
  }, [setisHeaderFooterShow]);

  // =====================================================
  // HANDLE EMAIL CHANGE
  // =====================================================

  const handleChange = (event) => {
    setEmail(event.target.value);

    setMessage("");
    setErrorMessage("");
  };

  // =====================================================
  // HANDLE FORGOT PASSWORD
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    const normalizedEmail =
      email.trim().toLowerCase();

    // ===================================================
    // VALIDATE EMAIL
    // ===================================================

    if (!normalizedEmail) {
      setErrorMessage(
        "Please enter your email address."
      );

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // SEND OTP REQUEST
      // =================================================

      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        {
          email: normalizedEmail,
        }
      );

      if (response.data.success) {
        setMessage(
          response.data.message ||
            "A 6-digit OTP has been sent to your email."
        );

        setEmailSent(true);

        // =================================================
        // SAVE EMAIL FOR RESET PASSWORD PAGE
        // =================================================

        sessionStorage.setItem(
          "resetPasswordEmail",
          normalizedEmail
        );
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      const backendMessage =
        error.response?.data?.message;

      setErrorMessage(
        backendMessage ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GO TO RESET PASSWORD
  // =====================================================

  const handleContinue = () => {
    navigate("/reset-password");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: 3,

        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",

          maxWidth: 450,

          backgroundColor: "#ffffff",

          padding: 4,

          borderRadius: 3,

          boxShadow: 3,
        }}
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Forgot Password?
        </Typography>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={3}
          sx={{
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Enter your registered email address and
          we will send you a 6-digit OTP to reset
          your password.
        </Typography>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* =================================================
            EMAIL
        ================================================= */}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading || emailSent}
          autoComplete="email"
        />

        {/* =================================================
            SEND OTP BUTTON
        ================================================= */}

        {!emailSent && (
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,

              mb: 2,

              height: 48,

              textTransform: "none",

              fontSize: "16px",

              fontWeight: 600,
            }}
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </Button>
        )}

        {/* =================================================
            CONTINUE TO RESET PASSWORD
        ================================================= */}

        {emailSent && (
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleContinue}
            sx={{
              mt: 2,

              mb: 2,

              height: 48,

              textTransform: "none",

              fontSize: "16px",

              fontWeight: 600,
            }}
          >
            Enter OTP & Reset Password
          </Button>
        )}

        {/* =================================================
            BACK TO LOGIN
        ================================================= */}

        <Typography
          textAlign="center"
          sx={{
            mt: 1,
          }}
        >
          Remember your password?{" "}

          <Link
            to="/signIn"
            style={{
              textDecoration: "none",

              color: "#1976d2",

              fontWeight: 500,
            }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default ForgotPassword;