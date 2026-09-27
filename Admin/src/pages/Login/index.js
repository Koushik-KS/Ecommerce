import { useContext, useEffect, useState } from "react";

import logo from "../../assets/images/logo.jpg";
import pattern from "../../assets/images/pattern.jpg";

import { MyContext } from "../../App";

import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TiEye } from "react-icons/ti";
import { IoEyeOffSharp } from "react-icons/io5";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

const Login = () => {
  // =====================================================
  // CONTEXT
  // =====================================================

  const context = useContext(MyContext);

  const navigate = useNavigate();

  // =====================================================
  // LOGIN INPUT STATES
  // =====================================================

  const [inputIndex, setInputIndex] = useState(null);

  const [isShowPassword, setIsShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // =====================================================
  // PERMANENT ADMIN LOGIN
  // ===========================================
const ADMIN_EMAIL = "koushikshetty102@gmail.com";

const ADMIN_PASSWORD = "Admin@123";
 

  // =====================================================
  // HIDE HEADER AND SIDEBAR ON LOGIN PAGE
  // =====================================================

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);

    return () => {
      context.setisHideSidebarAndHeader(false);
    };
  }, [context]);

  // =====================================================
  // INPUT FOCUS
  // =====================================================

  const focusInput = (index) => {
    setInputIndex(index);
    setError("");
  };

  // =====================================================
  // LOGIN FUNCTION
  // =====================================================

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    // Remove extra spaces from email
    const enteredEmail = email.trim();

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!enteredEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    // ===================================================
    // CHECK PERMANENT ADMIN CREDENTIALS
    // ===================================================

    if (
      enteredEmail === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setIsLoading(true);

      // =================================================
      // SAVE LOGIN SESSION
      // =================================================

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      localStorage.setItem(
        "adminEmail",
        ADMIN_EMAIL
      );

      // =================================================
      // UPDATE GLOBAL LOGIN STATE
      // =================================================

      if (context.setIsLogin) {
        context.setIsLogin(true);
      }

      // =================================================
      // SHOW HEADER + SIDEBAR
      // =================================================

      if (context.setisHideSidebarAndHeader) {
        context.setisHideSidebarAndHeader(false);
      }

      // =================================================
      // GO TO DASHBOARD
      // =================================================

      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } else {
      // =================================================
      // WRONG LOGIN
      // =================================================

      setError(
        "Invalid email or password. Please try again."
      );
    }
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <>
      {/* =================================================
          BACKGROUND PATTERN
      ================================================= */}

      <img
        src={pattern}
        className="loginPattern"
        alt="Login Background"
      />

      {/* =================================================
          LOGIN SECTION
      ================================================= */}

      <section className="loginSection">
        <div className="loginBox">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="logo text-center">
            <img
              src={logo}
              width="90"
              alt="Admin Logo"
            />

            <h5 className="fw-bold">
              Login to Admin
            </h5>
          </div>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div className="wrapper mt-3 card border">
            <form onSubmit={handleLogin}>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div
                className={`form-group position-relative ${
                  inputIndex === 0
                    ? "focus"
                    : ""
                }`}
              >
                <span className="icon">
                  <MdOutlineMail />
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  onFocus={() =>
                    focusInput(0)
                  }
                  onBlur={() =>
                    setInputIndex(null)
                  }
                  autoFocus
                />
              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div
                className={`form-group position-relative ${
                  inputIndex === 1
                    ? "focus"
                    : ""
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>

                <input
                  type={
                    isShowPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  onFocus={() =>
                    focusInput(1)
                  }
                  onBlur={() =>
                    setInputIndex(null)
                  }
                />

                {/* =================================================
                    SHOW / HIDE PASSWORD
                ================================================= */}

                <span
                  className="toggleShowPassword"
                  onClick={() =>
                    setIsShowPassword(
                      !isShowPassword
                    )
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {isShowPassword ? (
                    <IoEyeOffSharp />
                  ) : (
                    <TiEye />
                  )}
                </span>
              </div>

              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {error && (
                <div
                  style={{
                    color: "#d32f2f",
                    backgroundColor: "#ffebee",
                    border: "1px solid #ffcdd2",
                    borderRadius: "6px",
                    padding: "10px",
                    marginBottom: "15px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </div>
              )}

              {/* =================================================
                  SIGN IN BUTTON
              ================================================= */}

              <div className="form-group">
                <Button
                  type="submit"
                  className="btn-blue btn-lg w-100 btn-big"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Signing In..."
                    : "Sign In"}
                </Button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Login;