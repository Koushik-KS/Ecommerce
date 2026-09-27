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
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { MyContext } from "../../App";

// =====================================================
// API URL
// =====================================================

const API_URL =
  "https://ecommerce-hsm4.onrender.com";

// =====================================================
// SIGN IN COMPONENT
// =====================================================

function SignIn() {
  // ===================================================
  // CONTEXT
  // ===================================================

  const {
    setisHeaderFooterShow,
    setIsLogin,
    setUser,
  } = useContext(MyContext);

  // ===================================================
  // NAVIGATION
  // ===================================================

  const navigate = useNavigate();

  // ===================================================
  // FORM DATA
  // ===================================================

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // ===================================================
  // UI STATES
  // ===================================================

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  // ===================================================
  // HIDE HEADER AND FOOTER
  // ===================================================

  useEffect(() => {
    setisHeaderFooterShow(false);

    return () => {
      setisHeaderFooterShow(true);
    };
  }, [setisHeaderFooterShow]);

  // ===================================================
  // HANDLE INPUT CHANGE
  // ===================================================

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

    // Clear previous error
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // ===================================================
  // HANDLE LOGIN
  // ===================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const password =
      formData.password;

    // =================================================
    // VALIDATION
    // =================================================

    if (!email || !password) {
      setErrorMessage(
        "Please enter your email and password."
      );

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // LOGIN REQUEST
      // =================================================

      const response =
        await axios.post(
          `${API_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );

      // =================================================
      // LOGIN SUCCESS
      // =================================================

      if (response.data.success) {
        const {
          token,
          user,
        } = response.data;

        // =================================================
        // SAVE TOKEN
        // =================================================

        localStorage.setItem(
          "token",
          token
        );

        // =================================================
        // SAVE USER
        // =================================================

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        // =================================================
        // UPDATE GLOBAL CONTEXT
        // =================================================

        setUser(user);
        setIsLogin(true);

        // =================================================
        // GO TO HOME
        // =================================================

        navigate("/");
      } else {
        setErrorMessage(
          response.data.message ||
            "Login failed. Please check your details."
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      // =================================================
      // BACKEND ERROR
      // =================================================

      const backendMessage =
        error.response?.data?.message;

      // =================================================
      // NETWORK ERROR
      // =================================================

      if (
        error.code ===
        "ERR_NETWORK"
      ) {
        setErrorMessage(
          "Unable to connect to the server. Please try again later."
        );

        return;
      }

      // =================================================
      // ERROR MESSAGE
      // =================================================

      setErrorMessage(
        backendMessage ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // TOGGLE PASSWORD
  // ===================================================

  const handleTogglePassword = () => {
    setShowPassword(
      (previous) => !previous
    );
  };

  // ===================================================
  // RETURN UI
  // ===================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: 3,

        backgroundColor:
          "#f5f5f5",
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

        {/* =================================================
            TITLE
        ================================================= */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Welcome Back
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
          autoComplete="email"
        />

        {/* =================================================
            PASSWORD
        ================================================= */}

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={
            formData.password
          }
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
              >
                <IconButton
                  onClick={
                    handleTogglePassword
                  }
                  edge="end"
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* =================================================
            FORGOT PASSWORD
        ================================================= */}

        <Box
          sx={{
            display: "flex",

            justifyContent:
              "flex-end",

            mt: 1,
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration:
                "none",

              color: "#1976d2",

              fontSize: "14px",

              fontWeight: 500,
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        {/* =================================================
            SIGN IN BUTTON
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

            textTransform:
              "none",

            fontSize: "16px",

            fontWeight: 600,
          }}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </Button>

        {/* =================================================
            SIGN UP
        ================================================= */}

        <Typography
          textAlign="center"
        >
          Don't have an account?{" "}

          <Link
            to="/signUp"
            style={{
              textDecoration:
                "none",

              color: "#1976d2",

              fontWeight: 500,
            }}
          >
            Create Account
          </Link>
        </Typography>

      </Box>
    </Box>
  );
}

export default SignIn;