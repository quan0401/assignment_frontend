import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Image App
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/ImageUploadForm">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            Upload Image
          </button>
        </Link>
        <Link href="/ImageList">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Display Images
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
