import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const id = window.location.href.split("/").reverse()[0];
      const res = await fetch(`http://localhost:5000/profiles/profile/${id}`, {
        method: "GET",
      });

      const parseData = await res.json();

      setProfile(parseData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
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
