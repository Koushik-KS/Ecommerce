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

// =====================================================
// API URL
// =====================================================

const API_URL = "https://ecommerce-hsm4.onrender.com";

// =====================================================
// SIGN UP COMPONENT
// =====================================================

function SignUp() {
  const {
    setisHeaderFooterShow,
  } = useContext(MyContext);

  const navigate = useNavigate();

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
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
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );

    setErrorMessage("");
  };

  // =====================================================
  // HANDLE REGISTER
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const {
      name,
      phone,
      email,
      password,
    } = formData;

    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !password
    ) {
      setErrorMessage(
        "Please fill in all fields."
      );

      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );

      return;
    }

    // ===================================================
    // REGISTER USER
    // ===================================================

    try {
      setLoading(true);

      const response =
        await axios.post(
          `${API_URL}/api/auth/register`,
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email
              .trim()
              .toLowerCase(),
            password,
          }
        );

      // =================================================
      // SUCCESS
      // =================================================

      if (response.data.success) {
        setSuccessMessage(
          response.data.message ||
            "Registration successful. Redirecting to login..."
        );

        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/signIn");
        }, 1500);
      } else {
        setErrorMessage(
          response.data.message ||
            "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

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
          mb={3}
        >
          Create Account
        </Typography>

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
            SUCCESS MESSAGE
        ================================================= */}

        {successMessage && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {successMessage}
          </Alert>
        )}

        {/* =================================================
            FULL NAME
        ================================================= */}

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
        />

        {/* =================================================
            PHONE
        ================================================= */}

        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
        />

        {/* =================================================
            EMAIL
        ================================================= */}

        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
        />

        {/* =================================================
            PASSWORD
        ================================================= */}

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
          autoComplete="new-password"
        />

        {/* =================================================
            SIGN UP BUTTON
        ================================================= */}

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
            ? "Creating Account..."
            : "Sign Up"}
        </Button>

        {/* =================================================
            SIGN IN
        ================================================= */}

        <Typography textAlign="center">
          Already have an account?{" "}

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

export default SignUp;