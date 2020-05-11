import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { userDataSelector } from '@/stores/user/selectors';
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

const SubNavMenu = props => {
  const isNested = props.nested;
  const parent = props.parent;
  const hasThirdLevel = props.hasThirdLevel;

  const userData = useSelector(state => userDataSelector(state));
  const authenticated = userData && userData.auth ? userData.auth : false;

  function isVisible(target) {
    let bool = true;
    if (authenticated && target === 'auth--hidden') {
      bool = false;
    }
    if (!authenticated && target === 'auth--required') {
      bool = false;
    }
    return bool;
  }

  //
  function buildLink(url, name, className) {
    let isRewardsLink = url.split('/7rewards')[1];
    let isMenuLink = url.split('/menu')[1];
 
    if (isVisible(className)) {
      let hrefPath = '/[page]';
      if (isRewardsLink) {
        hrefPath = isRewardsLink ? `/7rewards/${isRewardsLink}` : '/[slug]';
      }
      if (isMenuLink) {
        hrefPath =  `/menu/[category]`;
      }
      if (url === '/7rewards') {
        hrefPath = '/7rewards';
      }

      if (url === '/') {
        hrefPath = '/';
      }

      if (!isRewardsLink && !isMenuLink) {
        hrefPath = '/[page]';
      }
    // Nutritional Information
     // console.log('NAV NAME ',  name )
     let dynamicLinks = name === 'Slurpee®' || name == 'Nutritional Information' ? false : true
 
      return (
        <>
        {dynamicLinks  && (
          <Link href={hrefPath} as={url}>
            <a>{name}</a>
          </Link>
        )}
        {name === 'Nutritional Information'  && (
          <Link href='/nutritional-information' replace={true}>
            <a>{name}</a>
          </Link>
        )}
        {name === 'Slurpee®' && (
          <a  href={url}
              target="_blank"
              rel="noopener noreferrer"
          >
            {name}
          </a>
        )}
        </>
      );
    }
  }

  return (
    <motion.ul
      variants={listVariants}
      className={classNames('SiteHeader__submenu', { '-nested': isNested })}
    >
      {props.items.map(({ name, url, children, className }, index) => (
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
          {children.length > 0 && <SubNavMenu items={children} nested />}
        </motion.li>
      ))}

      {parent && parent.name === 'Menu' && (
        <motion.li
          variants={itemVariants}
          className="SiteHeader__item -nested col col-12 text-center"
        >
         <Link href='/menu' replace={true}>
          <Button outlined>
            View Full Menu
          </Button>
          </Link>
        </motion.li>
      )}
    </motion.ul>
  );
};

const SubNav = props => {
  const items = props.items;
  const parent = props.parent;
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
      <SubNavMenu items={items} parent={parent} hasThirdLevel={hasThirdLevel} />
    </motion.div>
  );
};

export default SubNav;
