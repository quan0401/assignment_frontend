import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const imageData = reader.result;

      try {
        const response = await axios.post(
          "https://api.dev.socialappserver.online/api/v1/post",
          {
            image: imageData,
          }
        );
        console.log("Image uploaded successfully:", response.data);
        setNotification("Image uploaded successfully!");
        // Clear the notification after a few seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        console.error("Error uploading image:", error);
        setNotification("Error uploading image. Please try again.");
      }
    };
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Chose file before upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "block", marginBottom: "20px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            disabled={!image}
            style={{
              backgroundColor: image ? "#007bff" : "none",
              color: !image ? "#666" : "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
          <Link href="/">
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
              Home
            </button>
          </Link>
          <Link href="/ImageList">
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "lightpink",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Display Images
            </button>
          </Link>
        </div>
      </form>
      {image && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>Preview:</h3>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{
              maxWidth: "100%",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
      {notification && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {notification}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
