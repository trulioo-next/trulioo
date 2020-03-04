import React from 'react';
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';

import SubNav from './SubNav';

import CaretIcon from '@/static/images/caret-down.svg';
import linkData from '../placeholder-links.json'; // replace with real data later

const links = linkData.map(link => {
  link.key = `nav-link-${link.label}`;
  return link;
});

const TopLevelLink = props => {
  let item = props.item;
  const [isOpen, toggleOpen] = useCycle(false, true);

  const indicatorVariants = {
    open: {
      rotate: 180,
      transition: { duration: 0 },
    },
    closed: {
      rotate: 0,
      transition: { duration: 0 },
    },
  };

  if (item.children.length > 0 ) {
    return (
      <motion.li
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="SiteHeader__item -has-children"
        onHoverStart={() => toggleOpen()}
        onHoverEnd={() => toggleOpen()}
      >
        <motion.button className="SiteHeader__toggle -dropdown">
          {item.name}
          <motion.span
            className="SiteHeader__indicator"
            variants={indicatorVariants}
          >
            <CaretIcon />
          </motion.span>
        </motion.button>
        <SubNav i={props.i} items={item.children} parent={item} />
      </motion.li>
    );
  }

  return (
    <li className="SiteHeader__item">
      <Link href={item.url} as={item.url}>
        <a className="SiteHeader__link">{item.name}</a>
      </Link>
    </li>
  );
};

const PrimaryNav = (data) => {

  
   let LINKS = false
   if(data && data.data && data.data.data) {
      LINKS = data.data.data;
   }
   // console.log('DATA ', data )
  return (
    <>
    { LINKS && 
    <ul className="SiteHeader__menu -desktop">
      {LINKS.map((link, i) => (
        <TopLevelLink key={`nav-item-${i}`} i={i} item={link} />
      ))}
    </ul>
    }
     
    </>

  );
};

export default PrimaryNav;
