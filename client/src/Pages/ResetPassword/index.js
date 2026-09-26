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
  useSearchParams,
} from "react-router-dom";

import axios from "axios";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { MyContext } from "../../App";

const API_URL = "http://localhost:4000";

function ResetPassword() {
  const {
    setisHeaderFooterShow,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  // =====================================================
  // EMAIL FROM URL
  // =====================================================

  const email =
    searchParams.get("email");

  // =====================================================
  // FORM
  // =====================================================

  const [formData, setFormData] =
    useState({
      otp: "",
      password: "",
      confirmPassword: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

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

  const handleChange = (
    event
  ) => {
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
  // TOGGLE PASSWORD
  // =====================================================

  const handleTogglePassword =
    () => {
      setShowPassword(
        (previous) => !previous
      );
    };

  // =====================================================
  // TOGGLE CONFIRM PASSWORD
  // =====================================================

  const handleToggleConfirmPassword =
    () => {
      setShowConfirmPassword(
        (previous) => !previous
      );
    };

  // =====================================================
  // HANDLE RESET PASSWORD
  // =====================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const {
      otp,
      password,
      confirmPassword,
    } = formData;

    // ===================================================
    // CHECK EMAIL
    // ===================================================

    if (!email) {
      setErrorMessage(
        "Invalid password reset request. Please request a new OTP."
      );

      return;
    }

    // ===================================================
    // CHECK OTP
    // ===================================================

    if (!otp) {
      setErrorMessage(
        "Please enter the OTP sent to your email."
      );

      return;
    }

    if (
      !/^\d{6}$/.test(
        otp.trim()
      )
    ) {
      setErrorMessage(
        "OTP must contain exactly 6 digits."
      );

      return;
    }

    // ===================================================
    // CHECK PASSWORD
    // ===================================================

    if (
      !password ||
      !confirmPassword
    ) {
      setErrorMessage(
        "Please enter your new password and confirm it."
      );

      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setErrorMessage(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      // =================================================
      // RESET PASSWORD
      // =================================================

      const response =
        await axios.post(
          `${API_URL}/api/auth/reset-password`,
          {
            email:
              email
                .trim()
                .toLowerCase(),

            otp:
              otp.trim(),

            newPassword:
              password,
          }
        );

      if (response.data.success) {

        setSuccessMessage(
          response.data.message ||
            "Password reset successful."
        );

        setFormData({
          otp: "",
          password: "",
          confirmPassword: "",
        });

        // ===============================================
        // GO TO SIGN IN
        // ===============================================

        setTimeout(() => {
          navigate("/signIn");
        }, 2000);
      }
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      const backendMessage =
        error.response?.data
          ?.message;

      setErrorMessage(
        backendMessage ||
          "Unable to reset your password. Please try again."
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

        {/* TITLE */}

        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
        >
          Reset Password
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
          Enter the OTP sent to
          your email and create
          your new password.
        </Typography>

        {/* EMAIL */}

        {email && (
          <Alert
            severity="info"
            sx={{ mb: 2 }}
          >
            OTP sent to:{" "}
            <strong>
              {email}
            </strong>
          </Alert>
        )}

        {/* SUCCESS */}

        {successMessage && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
          >
            {successMessage}
          </Alert>
        )}

        {/* ERROR */}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        )}

        {/* OTP */}

        <TextField
          fullWidth
          label="6-Digit OTP"
          name="otp"
          type="text"
          value={formData.otp}
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
          inputProps={{
            maxLength: 6,
            inputMode:
              "numeric",
          }}
        />

        {/* NEW PASSWORD */}

        <TextField
          fullWidth
          label="New Password"
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
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={
                    handleTogglePassword
                  }
                  edge="end"
                  disabled={
                    loading
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

        {/* CONFIRM PASSWORD */}

        <TextField
          fullWidth
          label="Confirm New Password"
          name="confirmPassword"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={
            formData.confirmPassword
          }
          onChange={handleChange}
          margin="normal"
          required
          disabled={loading}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={
                    handleToggleConfirmPassword
                  }
                  edge="end"
                  disabled={
                    loading
                  }
                >
                  {showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* RESET BUTTON */}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={
            loading || !email
          }
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
            ? "Resetting..."
            : "Reset Password"}
        </Button>

        {/* SIGN IN */}

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

export default ResetPassword;