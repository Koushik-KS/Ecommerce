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

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

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
    setErrorMessage("");
  };

  // =====================================================
  // HANDLE FORGOT PASSWORD
  // =====================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setErrorMessage("");

    const normalizedEmail =
      email.trim().toLowerCase();

    // ===================================================
    // VALIDATION
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
      // SEND OTP
      // =================================================

      const response =
        await axios.post(
          `${API_URL}/api/auth/forgot-password`,
          {
            email:
              normalizedEmail,
          }
        );

      if (response.data.success) {

        // ===============================================
        // OPEN RESET PASSWORD PAGE
        // ===============================================

        navigate(
          `/reset-password?email=${encodeURIComponent(
            normalizedEmail
          )}`
        );
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      const backendMessage =
        error.response?.data
          ?.message;

      setErrorMessage(
        backendMessage ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
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

          backgroundColor:
            "#ffffff",

          padding: 4,

          borderRadius: 3,

          boxShadow: 3,
        }}
      >

        {/* TITLE */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Forgot Password?
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={3}
          sx={{
            fontSize: "14px",
            lineHeight: 1.6,
          }}
        >
          Enter your registered
          email address and we
          will send you a password
          reset OTP.
        </Typography>

        {/* ERROR */}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* EMAIL */}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="email"
        />

        {/* SEND OTP */}

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

            textTransform:
              "none",

            fontSize: "16px",

            fontWeight: 600,
          }}
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </Button>

        {/* BACK TO LOGIN */}

        <Typography
          textAlign="center"
        >
          Remember your password?{" "}

          <Link
            to="/signIn"
            style={{
              textDecoration:
                "none",

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