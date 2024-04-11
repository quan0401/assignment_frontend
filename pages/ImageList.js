import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
require("dotenv").config();
let HOST_URL = "http://13.230.147.6:5001";
if (process.env.NODE_ENV === "development") {
  HOST_URL = "http://localhost:3000";
}

const ImageList = () => {
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
          `http://13.230.147.6:5001/api/v1/post`,
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
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://13.230.147.6:5001/api/v1/post`);
      setImages(response.data.posts);
      // setImages(test.posts)
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleCommentChange = (index, event) => {
    const newImages = [...images];
    newImages[index].newComment = event.target.value;
    setImages(newImages);
  };

  const submitComment = async (index) => {
    const newImages = [...images];
    const newComment = newImages[index].newComment;
    if (newComment) {
      try {
        const response = await axios.post(
          `http://13.230.147.6:5001/api/v1/comment`,
          {
            username: "username", // Replace with the actual username
            postId: newImages[index]._id, // Assuming postId is stored in _id field of the image object
            comment: newComment,
          }
        );
        console.log("Comment submitted:", response.data);
        // Update the state to include the newly added comment
        newImages[index].comments.push(response.data.comment);
        // Clear the comment box after submitting
        newImages[index].newComment = "";
        setImages(newImages);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      submitComment(index);
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Upload Image</h2>
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
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={{ maxWidth: "300px" }}>
            <div style={{ marginBottom: "10px" }}>
              <img
                src={image.imageUrl}
                alt={`Image ${index}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
            <div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {image.comments.map((comment, commentIndex) => (
                  <li
                    key={commentIndex}
                    style={{
                      marginBottom: "5px",
                      padding: "5px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                    }}
                  >
                    <b>{comment.userId}: </b>
                    {comment.comment}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <input
                type="text"
                value={image.newComment || ""}
                placeholder="Add a comment..."
                onChange={(event) => handleCommentChange(index, event)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
              />
              <button
                onClick={() => submitComment(index)}
                style={{
                  marginTop: "8px",
                  padding: "8px",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageList;
