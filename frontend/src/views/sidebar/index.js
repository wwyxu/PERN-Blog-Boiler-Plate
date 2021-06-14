import React from "react";
import Link from "./link";
import Header from "./header";
import ExactLink from "./exact-link";

const Sidebar = ({ isAuthenticated, setAuth }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div
          className="container-fluid sidebar p-0 bg-dark"
          style={{ minHeight: "100vh" }}
        >
          <div className="container-fluid p-0 ">
            <Header />
            <Link link="/profiles" name="Profiles" />
            <Link link="/posts" name="Posts" />
            <ExactLink link="/addpost" name="Add Post" />
            <ExactLink link="/myposts" name="My Posts" />
            <ExactLink link="/settings" name="Settings" />
            <a
              href="#"
              className="list-group-item p-2 m-2 text-center text-white"
              style={{
                backgroundColor: "#343a40",
                textDecoration: "none",
                outline: "none",
                border: "none",
                borderRadius: "5px",
              }}
              type="button"
              onClick={(e) => logout(e)}
            >
              {" "}
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div
          className="container-fluid sidebar p-0 bg-dark"
          style={{ minHeight: "100vh" }}
        >
          <div className="container-fluid p-0 ">
            <Header />
            <ExactLink link="/" name="Home" />
            <Link link="/profiles" name="Profiles" />
            <Link link="/posts" name="Posts" />
            <ExactLink link="/login" name="Log In" />
            <ExactLink link="/register" name="Register" />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
