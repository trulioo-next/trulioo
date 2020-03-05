import classNames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Toolbar from './Toolbar';
import SubNav from './SubNav';

import LocationIcon from '@/static/images/location.svg';
import AccountIcon from '@/static/images/account.svg';
import CaretIcon from '@/static/images/caret-down.svg';
// import linkData from '../placeholder-links.json'; // replace with real data later

const NavItem = ({ item, i, expanded, setExpanded, className }) => {
  const isOpen = i === expanded;
  let itemClassnames = classNames(
    'SiteHeader__item',
    {
      '-has-children': item.children.length > 0,
    },
    className,
  );

  if (item.children.length > 0) {
    return (
      <motion.li
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={itemClassnames}
        onHoverStart={() => setExpanded(isOpen ? false : i)}
        onHoverEnd={() => setExpanded(false)}
      >
        <button className="SiteHeader__toggle -dropdown">
          {item.name}
          <span
            className={classNames('SiteHeader__indicator', {
              '-toggled': isOpen,
            })}
          >
            <CaretIcon />
          </span>
        </button>
        <SubNav i={i} items={item.children} parent={item} />
      </motion.li>
    );
  }

  return (
    <li className={itemClassnames}>
      <Link href={item.url} as={item.url}>
        <a className="SiteHeader__link">{item.name}</a>
      </Link>
    </li>
  );
};

const PrimaryNav = data => {
  const [expanded, setExpanded] = useState(false);
  var searchIndex = 0;

  let LINKS = false;

  if (data && data.data && data.data.data) {
    LINKS = data.data.data;
  }

  return (
    <>
      {LINKS && (
        <>
          <ul className="SiteHeader__menu -desktop">
            {LINKS.map((link, i) => {
              searchIndex += 1;

              return (
                <NavItem
                  key={`nav-item-${i}`}
                  i={i}
                  item={link}
                  expanded={link.children.length > 0 ? expanded : null}
                  setExpanded={link.children.length > 0 ? setExpanded : null}
                />
              );
            })}
          </ul>
          <Toolbar>
            <Toolbar.Item url="/store-locator">
              <Toolbar.Icon>
                <LocationIcon />
              </Toolbar.Icon>
              <Toolbar.Label>Find A Store</Toolbar.Label>
            </Toolbar.Item>
            <Toolbar.Item url="/account">
              <Toolbar.Icon>
                <AccountIcon />
              </Toolbar.Icon>
              <Toolbar.Label>Account</Toolbar.Label>
            </Toolbar.Item>
            <Toolbar.Search
              i={searchIndex}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          </Toolbar>
        </>
      )}
    </>
  );
};

export default PrimaryNav;
