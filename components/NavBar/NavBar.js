import React from "react";
import Link from "next/link";

import Logo from "@/static/images/7-eleven.svg";
import CondensedLogo from "@/static/images/7-eleven-condensed.svg";

import LocationIcon from "@/static/images/location.svg";
import AccountIcon from "@/static/images/account.svg";
import SearchIcon from "@/static/images/search.svg";

import "./NavBar.scss";

const links = [
  { href: "/about", as: "/about", label: "About" },
  { href: "/contact", as: "/contact", label: "Contact" }
].map(link => {
  link.key = `nav-link-${link.as}-${link.label}`;
  return link;
});

/**
 *
 * TODO: Child/sub links dropdown
 * TODO: Search toggle dropdown
 * TODO: Mobile navigation
 *
 */

const NavBar = () => (
  <nav className="site-header">
    <button
      role="tab"
      className="menu-toggle site-header__menu-toggle js-toggle-menu"
    >
      <div></div>
      <div></div>
      <div></div>
    </button>

    <Link href="/">
      <a className="site-header__logo">
        <Logo />
      </a>
    </Link>

    <ul className="site-header__menu site-header__menu--primary">
      {links.map(({ key, href, as, label }) => (
        <li key={key} className="site-header__item">
          <Link href={href} as={as}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>

    <ul className="site-header__menu site-header__menu--utility">
      <li className="site-header__item">
        <a className="site-header__link" href="#">
          <span className="site-header__link-icon">
            <LocationIcon />
          </span>
          <span className="site-header__link-text">Find A Store</span>
        </a>
      </li>
      <li className="site-header__item">
        <a className="site-header__link" href="#">
          <span className="site-header__link-icon">
            <AccountIcon />
          </span>
          <span className="site-header__link-text">Account</span>
        </a>
      </li>
      <li className="site-header__item site-header__item--search">
        <button
          role="tab"
          className="search-toggle site-header__search-toggle js-toggle-search"
        >
          <span className="site-header__link-icon search-toggle__icon">
            <SearchIcon />
          </span>
        </button>
      </li>
    </ul>
  </nav>
);
export default NavBar;
