import React, { useEffect, useState } from "react";
import bgImage from "../assets/dashboard.jpg";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("No user logged in");
      return;
    }

    const user = JSON.parse(storedUser);
    const email = user.email;

    fetch(`http://localhost:5000/api/users/profile/${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(141, 214, 246, 0.76)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(2, 0, 0, 1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Profile Details</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone || "Not Provided"}</p>
        <p><strong>Address:</strong> {profile.address || "Not Provided"}</p>
      </div>
    </div>
  );
};

export default Profile;
