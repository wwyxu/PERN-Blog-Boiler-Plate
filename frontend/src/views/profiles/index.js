import React, { useState, useEffect } from "react";
import Profile from "./profile";
import API from '../../services/api';

const Profiles = () => {
  const [allProfiles, setAllProfiles] = useState([]);

  const getProfiles = async () => {
    try {
      const res = await API.profiles.get();
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
      <Profile allProfiles={allProfiles} />
    </div>
  );
};

export default Profiles;
