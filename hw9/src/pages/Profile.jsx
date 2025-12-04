import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/Profile.css";

function Profile() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setError("");
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>Profile</h1>
        
        {error && <ErrorBox message={error} />}
        
        <div className="profile-info">
          <div className="info-item">
            <strong>Email:</strong> {currentUser?.email}
          </div>
          <div className="info-item">
            <strong>User ID:</strong> {currentUser?.uid}
          </div>
          <div className="info-item">
            <strong>Email Verified:</strong> {currentUser?.emailVerified ? "Yes" : "No"}
          </div>
          <div className="info-item">
            <strong>Account Created:</strong> {currentUser?.metadata.creationTime}
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="logout-btn"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Log Out"}
        </button>
      </div>
    </div>
  );
}

export default Profile;