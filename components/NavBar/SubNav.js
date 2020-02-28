import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * TODO: Add close button.
 */

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NestedSubNav = props => (
  <motion.ul
    variants={listVariants}
    className="site-header__submenu site-header__submenu--nested"
  >
    {props.items.map(({ key, href, as, label }) => (
      <motion.li
        variants={itemVariants}
        key={key}
        className="site-header__item site-header__item--nested"
      >
        <Link href={href} as={as}>
          <a>{label}</a>
        </Link>
      </motion.li>
    ))}
  </motion.ul>
);

const SubNav = props => {
  const items = props.items;
  let hasThirdLevel = false;

  const subMenuAnimate = {
    open: {
      opacity: 1,
      height: "auto",
      display: "block",
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duraton: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  var i,
    l = items.length;

  for (i = 0; i < l; i += 1) {
    if (items[i].subnav) {
      hasThirdLevel = true;
      break;
    }
  }

  return (
    <motion.div
      variants={subMenuAnimate}
      className={`site-header__subnav ${hasThirdLevel &&
        "site-header__subnav--has-grandchildren"}`}
    >
      <motion.ul variants={listVariants} className="site-header__submenu">
        {items.map(({ key, href, as, label, subnav }) => {
          return (
            <motion.li
              variants={itemVariants}
              key={key}
              className="site-header__item site-header__item--nested"
            >
              <Link href={href} as={as}>
                <a className={hasThirdLevel && "site-header__subnav-heading"}>
                  {label}
                </a>
              </Link>
              {subnav && <NestedSubNav items={subnav} />}
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default SubNav;
