import React, { Fragment } from "react";
import { toast } from "react-toastify";

const Settings = ({ setAuth }) => {
  const deleteAccount = async (id) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("jwt_token", localStorage.token);

        const response = await fetch(`http://localhost:5000/authentication/`, {
          method: "DELETE",
          headers: myHeaders,
        });
        const parseRes = await response.json();

        if (parseRes === "Account was deleted") {
          toast.success("Account Deletion Successful");
          localStorage.removeItem("token");
          setAuth(false);
        } else {
          toast.error(parseRes);
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
        console.error(err.message);
      }
    }
  };

  return (
    <Fragment>
      <div className="text-center mt-5">
        <button
          type="button"
          className="btn btn-info"
          onClick={(e) => deleteAccount(e)}
        >
          Delete Account
        </button>
      </div>
    </Fragment>
  );
};

export default Settings;
