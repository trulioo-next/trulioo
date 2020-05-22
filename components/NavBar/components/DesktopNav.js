import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Toolbar from './Toolbar';
import SubNav from './SubNav';
  

const NavItem = ({ item, i, expanded, setExpanded, className }) => {
  const isOpen = i === expanded;
  let itemClassnames = classNames(
    'SiteHeader__item',
    {
      '-has-children': item.children.length > 0,
      '-active': isOpen,
    },
    className,
  );
  let isExternal = item.url.substring(0,4) === "http";
   
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
          <span className="SiteHeader__indicator">
            Icon 
          </span>
        </button>
        <SubNav
          i={i}
          items={item.children}
          parent={item}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      </motion.li>
    );
  }

  return (
    <li className={itemClassnames}>
      {item.name != isExternal && (
        <Link href={item.url} replace={true}>
          <a className="SiteHeader__link">{item.name}</a>
        </Link>
      )}
      {isExternal && (
         <Link href="/slurpee" replace={true}>
          <a
            className="SiteHeader__link"
            href={item.url}
          >
            {item.name}
          </a>
         </Link>
      )}
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
    <div>
      {LINKS && (
        <div>
          <ul className="SiteHeader__menu -desktop">
            {LINKS.map((link, i) => {
              searchIndex += 1;
              // console.log('PRIMARY NAV CHILDREN  ', link.children )
              return (
                <NavItem
                  key={`nav-item-${i}`}
                  i={i}
                  item={link}
                  {...(link.children.length > 0 && {
                    expanded: expanded,
                    setExpanded: setExpanded,
                  })}
                />
              );
            })}
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default PrimaryNav;
