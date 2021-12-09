import { NavLink } from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      className={ ({isActive}) =>
        "nav-link" + (!isActive ? "" : " router-link-exact-active")
      }
    >
      Home
    </NavLink>
    <NavLink
      to="/private"
      className={ ({isActive}) =>
        "nav-link" + (!isActive ? "" : " router-link-exact-active")
      }
    >
      Private
    </NavLink>
  </div>
);

export default MainNav;
