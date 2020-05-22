import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
 
import { useSelector, useDispatch } from 'react-redux';

import Button from '@/components/Button';

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

const SubNavMenu = ({ items, parent, hasThirdLevel, setExpanded, nested }) => {
  const isNested = nested;
 
  //
  function buildLink(url, name, className) {
      
      let hrefPath = '/[page]';
      let length = url.split('/');
      let num = length && length.length ? length.length : 0;
      
      if( num === 2) {
        hrefPath = '/[page]';
      }
      if( num === 3) {
        hrefPath = '/[page]/[slug]';
      }
      if( num === 4) {
        hrefPath = '/[page]/[slug]/[child]';
      }
      
      return (
        <div>
          <Link href={hrefPath} as={url} prefetch={false} replace>
            <a>{name}</a>
          </Link>
        </div>
      );
    
  }

  return (
      
    <motion.ul
      variants={listVariants}
      className={classNames('SiteHeader__submenu', { '-nested': isNested })}
    >
      {items.map(({ name, url, children, className }, index) => (
        <motion.li
          variants={itemVariants}
          key={index}
          className={classNames('SiteHeader__item', '-nested', {
            col: hasThirdLevel && !isNested,
          })}
        >
          {hasThirdLevel ? (
            <span className="SiteHeader__subnavHeading">{name}</span>
          ) : (
            buildLink(url, name, className)
          )}
          {children.length > 0 && (
            <SubNavMenu items={children} setExpanded={setExpanded} nested />
          )}
        </motion.li>
      ))}

      {parent && parent.name === 'Menu' && (
        <motion.li
          variants={itemVariants}
          className="SiteHeader__item -nested col col-12 text-center"
        >
          <Link href="/menu" replace={true}>
            <Button outlined>
              View Full Menu
            </Button>
          </Link>
        </motion.li>
      )}
    </motion.ul>
  );
};

const SubNav = ({ items, parent, expanded, setExpanded, ...props }) => {
  let hasThirdLevel = false;

  const subMenuAnimate = {
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

  var i,
    l = items.length;

  for (i = 0; i < l; i += 1) {
    if (items[i].children.length > 0) {
      hasThirdLevel = true;
      break;
    }
  }

  return (
    <motion.div
      variants={subMenuAnimate}
      className={classNames('SiteHeader__subnav', {
        '-has-grandchildren': hasThirdLevel,
      })}
    >
      <SubNavMenu
        items={items}
        parent={parent}
        hasThirdLevel={hasThirdLevel}
        setExpanded={setExpanded}
      />
    </motion.div>
  );
};

export default SubNav;
