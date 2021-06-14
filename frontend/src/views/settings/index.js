import React, { Fragment } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const Settings = ({ setAuth }) => {
  const deleteAccount = async (id) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        const res = await API.auth.delete();
        const parseRes = await res.json();

        if (parseRes) {
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
