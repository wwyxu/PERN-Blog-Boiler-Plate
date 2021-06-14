import React, { Fragment } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const Settings = ({ setAuth }) => {
  const deleteAccount = async () => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        const res = await API.auth.delete();
        const parseRes = await res.json();
        parseRes ? toast.success("Account Deletion Successful") : toast.error(parseRes);
        localStorage.removeItem("token");
      } catch (err) {
        console.error(err.message);
      } finally {
        setAuth(false);
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
