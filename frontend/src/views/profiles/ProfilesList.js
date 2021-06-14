import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfilesList = ({ allProfiles }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setProfiles(allProfiles);
  }, [allProfiles]);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Profiles</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length !== 0 &&
            profiles[0].user_id !== null &&
            profiles.map((profile) => (
              <tr key={profile.user_id}>
                <td>
                  <Link to={`/profiles/${profile.user_id}`}>
                    {profile.user_name}{" "}
                  </Link>
                </td>
                <td>{profile.date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ProfilesList;
