import React from "react";
export const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#cf6363c4",
          maxWidth: "460px",
          marginRight: "50px",
          height: "60px",
          borderTopRightRadius: "100px",
          display: "flex",
          alignItems: "end",
          padding: "20px",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <p> © {new Date().getFullYear()}, Tove Karlström</p>
      </div>
    </footer>
  );
};
