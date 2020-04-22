import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import SearchIcon from '@/static/images/search.svg';

const ToolbarItem = ({ url, target, children }) => (
  <li className="SiteHeader__item">
    <Link href={url}>
      <a className="SiteHeader__link" target={target}>{children}</a>
    </Link>
  </li>
);

const ToolbarIcon = ({ children }) => (
  <span className="Toolbar__icon">{children}</span>
);

const ToolbarLabel = ({ children }) => (
  <span className="Toolbar__label">{children}</span>
);

const ToolbarSearch = ({ i, expanded, setExpanded }) => {
  const isOpen = i === expanded;

  return (
    <motion.li
      className="SiteHeader__item -search"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <button
        role="tab"
        className={classNames('SiteHeader__toggle', '-search', {
          '-toggled': isOpen,
        })}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <ToolbarIcon>
          <SearchIcon />
        </ToolbarIcon>
      </button>
      <SearchCollapse />
    </motion.li>
  );
};

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

const Toolbar = ({ children }) => <ul className="Toolbar">{children}</ul>;

Toolbar.Item = ToolbarItem;
Toolbar.Icon = ToolbarIcon;
Toolbar.Label = ToolbarLabel;
Toolbar.Search = ToolbarSearch;

export default Toolbar;
