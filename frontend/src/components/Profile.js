// src/components/Profile.js
import React, { useEffect, useState } from "react";
import API from "../api/api";

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get(`/auth/profile/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Wallet Balance:</strong> ${user.walletBalance.toFixed(2)}</p>
    </div>
  );
};

export default Profile;
