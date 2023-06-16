import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";
import { Logo, SearchIcon } from "@icons";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Now Playing", to: "/movies/now-playing" },
  { name: "Categories", to: "/categories" },
  { name: "Popular", to: "/movies/popular" },
  { name: "Top Rated", to: "/movies/top-rated" },
  { name: "Upcoming", to: "/movies/upcoming" },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
    setShowSearch(false);
  };
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setShowMenu(false);
  };
  return (
    <header id="header" className="Header">
      <div className="Header__container container">
        <button
          className={`Header__nav-toggle ${showMenu ? "open" : ""}`}
          onClick={toggleMenu}
          title="Toggle Main Navbar"
        >
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div className="Header__logo">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <button
          className="Header__search-toggle"
          onClick={toggleSearch}
          title="Toggle Search Bar"
        >
          <SearchIcon />
        </button>
        <nav className={`Header__nav ${showMenu ? "open" : ""}`}>
          <ul>
            {navigation.map((link) => (
              <li key={`Link-${link.to}`}>
                <NavLink
                  className="navLink"
                  to={link.to}
                  onClick={() => setShowMenu(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`Header__search ${showSearch ? "open" : ""}`}>
          <form id="searchForm">
            <input type="text" placeholder="Search" />
            <button type="submit">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
