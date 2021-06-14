import React, { useState, useEffect } from "react";
import API from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await API.profile.getProfile(window.location.href.split("/").reverse()[0]);
      const parseData = await res.json();
      setProfile(parseData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="text-center mb-3 mt-5">
      {loading ? (
        <div>Loading</div>
      ) : (
        profile.length !== 0 &&
        profile[0].user_id !== null && (
          <div>
            <div>{profile[0].user_name}</div>
            <div>{profile[0].date}</div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
