import React from "react";
import { NavLink } from "react-router-dom";

const exactLink = ({ link, name }) => {
  return (
    <>
      <NavLink
        href="#"
        activeStyle={{ backgroundColor: "black", outline: "none", border: "none" , borderRadius: "5px" }}
        style={{ backgroundColor: "#343a40", textDecoration: "none", outline: "none", border: "none" , borderRadius: "5px" }}
        exact to={link}
        className="list-group-item p-2 m-2 text-center text-white"
      >
        {name}
      </NavLink>
    </>
  );
};
export default exactLink;
