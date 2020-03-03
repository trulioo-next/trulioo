import React from 'react';
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';

import LocationIcon from '@/static/images/location.svg';
import AccountIcon from '@/static/images/account.svg';
import SearchIcon from '@/static/images/search.svg';

const SearchCollapse = () => {
  const collapseVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      display: 'block',
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
        display: 'none',
      },
    },
  };

  return (
    <motion.div variants={collapseVariants} className="Search__collapse">
      <form className="Search__form">
        <div className="Search__inputGroup">
          <input type="text" className="Search__input" placeholder="Search" />
          <input type="submit" className="sr-only" value="Search" />
        </div>
      </form>
    </motion.div>
  );
};

const Toolbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <ul className="Toolbar">
      <li className="SiteHeader__item">
        <Link href="/store-locator" as="/store-locator">
          <a className="SiteHeader__link">
            <span className="Toolbar__icon">
              <LocationIcon />
            </span>
            <span className="Toolbar__label">Find A Store</span>
          </a>
        </Link>
      </li>
      <li className="SiteHeader__item">
        <Link href="/7rewards" as="/7rewards">
          <a className="SiteHeader__link">
            <span className="Toolbar__icon">
              <AccountIcon />
            </span>
            <span className="Toolbar__label">Account</span>
          </a>
        </Link>
      </li>
      <motion.li
        className="SiteHeader__item -search"
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      >
        <button
          role="tab"
          className="SiteHeader__toggle -search"
          onClick={() => toggleOpen()}
        >
          <span className="Toolbar__icon">
            <SearchIcon />
          </span>
        </button>
        <SearchCollapse />
      </motion.li>
    </ul>
  );
};

export default Toolbar;
