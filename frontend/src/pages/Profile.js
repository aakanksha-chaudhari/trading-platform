import React, { useEffect, useState } from "react";
import API from "../api/api";

const Profile = () => {
  const [user, setUser] = useState({ email: "", walletBalance: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // optional if auth needed
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Demo Balance:</strong> ${user.walletBalance}</p>
    </div>
  );
};

export default Profile;
