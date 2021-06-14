import React, { useState, useEffect } from "react";
import ProfilesList from "./ProfilesList";

const Profiles = () => {
  const [allProfiles, setAllProfiles] = useState([]);

  const getProfiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/profiles/", {
        method: "GET",
      });

      const parseData = await res.json();

      setAllProfiles(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="jumbotron mt-5">
      <h1>Profiles</h1>
      <ProfilesList allProfiles={allProfiles} />
    </div>
  );
};

export default Profiles;
