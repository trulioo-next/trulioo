import classNames from 'classnames';
import React, { useState } from 'react';
import Router from 'next/router'
import Link from 'next/link';
import { motion } from 'framer-motion';
 

const ToolbarItem = ({ url, target, children }) => (
  <li className="SiteHeader__item">
    {target ? (
      <a className="SiteHeader__link" href={url} target={target}>
        {children}
      </a>
    ) : (
      <Link href={url}>
        <a className="SiteHeader__link">{children}</a>
      </Link>
    )}
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
         Search
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

  const [searchTerm, setSearchTerm] = useState()

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = event => {
    event.preventDefault();
    Router.push('/search?search=' + encodeURIComponent(searchTerm))
  }

  return (
    <motion.div variants={collapseVariants} className="Search__collapse">
      <form className="Search__form" onSubmit={handleSearchSubmit}>
        <div className="Search__inputGroup">
          <input type="text" className="Search__input" placeholder="Search" onChange={handleSearchChange}/>
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
