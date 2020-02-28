import React from "react";
import Link from "next/link";
import { motion, useCycle } from "framer-motion";

import SubNav from "./SubNav";

import CaretIcon from "@/static/images/caret-down.svg";
import linkData from "./placeholder-links.json"; // replace with real data later

/**
 * TODO: Close existing dropdown if other dropdown toggle is clicked.
 */

const links = linkData.map(link => {
  link.key = `nav-link-${link.label}`;
  return link;
});

const TopLevelLink = props => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  if (props.item.subnav) {
    return (
      <motion.li
        key={props.item.key}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="site-header__item site-header__item--has-children"
      >
        <button
          className="site-header__dropdown-toggle"
          onClick={() => toggleOpen()}
        >
          {props.item.label} <CaretIcon className="site-header__indicator" />
        </button>
        <SubNav items={props.item.subnav} />
      </motion.li>
    );
  }

  return (
    <li key={props.item.key} className="site-header__item">
      <Link href={props.item.href} as={props.item.as}>
        <a className="site-header__link">{props.item.label}</a>
      </Link>
    </li>
  );
};

const PrimaryNav = () => {
  return (
    <ul className="site-header__menu site-header__menu--primary">
      {links.map(link => (
        <TopLevelLink key={link.key} item={link} />
      ))}
    </ul>
  );
};

export default PrimaryNav;
