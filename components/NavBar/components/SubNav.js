import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const NestedSubNav = props => {
  let nestedIndex = props.i;
  let parentIndex = props.parentIndex;

  return (
    <motion.ul variants={listVariants} className="SiteHeader__submenu -nested">
      {props.items.map(({ href, as, label }, index) => (
        <motion.li
          variants={itemVariants}
          key={`subnav-${parentIndex}-nested-${nestedIndex}-item-${index}`}
          className="SiteHeader__item -nested"
        >
          <Link href={href} as={as}>
            <a>{label}</a>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

const SubNav = props => {
  const items = props.items;
  let subnavIndex = props.i;
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
    if (items[i].subnav) {
      hasThirdLevel = true;
      break;
    }
  }

  return (
    <motion.div
      variants={subMenuAnimate}
      className={
        hasThirdLevel
          ? 'SiteHeader__subnav -has-grandchildren'
          : 'SiteHeader__subnav'
      }
    >
      <motion.ul variants={listVariants} className="SiteHeader__submenu">
        {items.map(({ href, as, label, subnav }, index) => {
          return (
            <motion.li
              variants={itemVariants}
              key={`subnav-${subnavIndex}-item-${index}`}
              className={
                hasThirdLevel
                  ? 'SiteHeader__item -nested col'
                  : 'SiteHeader__item -nested'
              }
            >
              <Link href={href} as={as}>
                <a className={hasThirdLevel ? 'SiteHeader__subnavHeading' : ''}>
                  {label}
                </a>
              </Link>
              {subnav && (
                <NestedSubNav
                  items={subnav}
                  i={index}
                  parentIndex={subnavIndex}
                />
              )}
            </motion.li>
          );
        })}
        {props.parent.label === 'Menu' && (
          <motion.li
            variants={itemVariants}
            className="SiteHeader__item -nested col col-12 text-center"
          >
            <Button href="/menu" as="/menu">
              View Full Menu
            </Button>
          </motion.li>
        )}
      </motion.ul>
    </motion.div>
  );
};

export default SubNav;
