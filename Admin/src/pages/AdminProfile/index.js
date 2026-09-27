import React from "react";
import { FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "@mui/material";

const AdminProfile = () => {
  const admin = {
    name: "Koushik Shetty",
    email: "admin@example.com",
    role: "Administrator",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTx3SRpQ8G8mKf3SUHnnn5mzgz7jx2WnePnA&s",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("isLogin");

    window.location.href = "/login";
  };

  return (
    <div className="container-fluid py-4">
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "15px",
          padding: "35px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* TITLE */}
        <div className="text-center mb-4">
          <h2 style={{ marginBottom: "5px" }}>
            Admin Profile
          </h2>

          <p style={{ color: "#777", margin: 0 }}>
            Manage your administrator profile
          </p>
        </div>

        {/* PROFILE PHOTO */}
        <div className="text-center mb-4">
          <img
            src={admin.image}
            alt="Admin"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #eeeeee",
            }}
          />
        </div>

        {/* ADMIN ICON */}
        <div
          className="d-flex justify-content-center mb-4"
          style={{
            fontSize: "45px",
            color: "#1976d2",
          }}
        >
          <FaUserShield />
        </div>

        {/* ADMIN NAME */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>
            {admin.name}
          </h3>

          <span
            style={{
              color: "#1976d2",
              fontWeight: "500",
            }}
          >
            {admin.role}
          </span>
        </div>

        {/* EMAIL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "15px",
            background: "#f7f9fc",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <MdEmail
            style={{
              fontSize: "25px",
              color: "#1976d2",
            }}
          />

          <div>
            <small
              style={{
                color: "#777",
                display: "block",
              }}
            >
              Email
            </small>

            <strong>{admin.email}</strong>
          </div>
        </div>

        {/* LOGOUT */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
          style={{
            padding: "12px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "16px",
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminProfile;