
import React from "react";

const UserAvatarImgComponent = (props) => {
  const {
    img,
    name = "Customer",
    lg = false,
  } = props;

  // Get the first letter of the customer's name
  const getInitial = () => {
    const trimmedName = String(name || "").trim();

    if (!trimmedName) {
      return "U";
    }

    return trimmedName.charAt(0).toUpperCase();
  };

  const hasValidImage =
    img &&
    typeof img === "string" &&
    img.trim() !== "" &&
    !img.includes("via.placeholder.com");

  return (
    <div className={`userImg ${lg ? "lg" : ""}`}>
      <span
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: lg ? "52px" : "40px",
          height: lg ? "52px" : "40px",
          minWidth: lg ? "52px" : "40px",
          backgroundColor: "#2878f0",
          color: "#ffffff",
          fontSize: lg ? "23px" : "18px",
          fontWeight: "600",
          textTransform: "uppercase",
          overflow: "hidden",
          border: "2px solid #e0eaff",
        }}
      >
        {hasValidImage ? (
          <img
            src={img}
            alt={name || "Customer"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          getInitial()
        )}
      </span>
    </div>
  );
};

export default UserAvatarImgComponent;