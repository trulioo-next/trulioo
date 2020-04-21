import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import Accordion from 'react-bootstrap/Accordion';

import SearchIcon from '@/static/images/search.svg';
import ChevronIcon from '@/static/images/caret-down.svg';
import { userDataSelector } from '@/stores/user/selectors';



// import linkData from '../placeholder-links.json';

const RewardsArea = props => (
  <motion.div className="OffCanvas__rewards" variants={props.variants}>
    <h2 className="OffCanvas__rewardsHeading">Welcome back, Jane Smith.</h2>
    <div className="OffCanvas__rewardsInfo">
      <p>Earn 7Rewards points for every purchase.</p>
    </div>
    <ul className="OffCanvas__rewardsNav">
      <li className="OffCanvas__rewardsNavItem">
        <Link href="/7rewards/account" as="/7rewards/account">
          <a>Account</a>
        </Link>
      </li>
      <li className="OffCanvas__rewardsNavItem">
        <Link href="/7rewards/logout" as="/7rewards/logout">
          <a>Sign Out</a>
        </Link>
      </li>
    </ul>
  </motion.div>
);

const NavToggle = props => (
  <button role="tab" className="OffCanvas__toggle -menu" onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </button>
);

const SubNavMenu = props => {
  const isNested = props.nested;
  const hasThirdLevel = props.hasThirdLevel;
  const subnavIndex = props.i;
  const parentIndex = isNested ? props.parentIndex : false;
  const keyPrefix = isNested
    ? `offcanvas-subnav-${parentIndex}-nested-${subnavIndex}`
    : `offcanvas-subnav-${subnavIndex}`;

  const userData = useSelector(state => userDataSelector(state));

  return (
    <>
    { props.items && 
    <ul className={classNames('OffCanvas__subnav', { '-nested': isNested })}>
      {props.items.map(({ name, url, children }, index) => (
        <li
          key={`${keyPrefix}-item-${index}`}
          className={classNames('OffCanvas__subnavItem', '-nested', {
            col: hasThirdLevel && !isNested,
          })}
        >
          {hasThirdLevel ? (
            <span className="OffCanvas__subnavHeading">{name}</span>
          ) : (
            <Link href="/[slug]" as={url} >
              <a>{name}</a>
            </Link>
          )}
          {children.length > 0 && (
            <SubNavMenu
              items={children}
              i={index}
              parentIndex={subnavIndex}
              nested
            />
          )}
        </li>
      ))}
    </ul>
    }
    </>
  );
};

const NavItem = props => {
  let item = props.item;
  let itemIndex = props.i;

  if (item.children.length > 0) {
    const [opened, setOpened] = useState(false);
    let items = item.children;
    let hasThirdLevel = false;
    var i,
      l = items.length;

    for (i = 0; i < l; i += 1) {
      if (items[i].children.length > 0) {
        hasThirdLevel = true;
        break;
      }
    }

    return (
      <>
        <li className="OffCanvas__item">
          <Link href="/[slug]" as={item.url}>
            <a className="OffCanvas__link">{item.name}</a>
          </Link>
          <Accordion.Toggle
            as="button"
            eventKey={`offcanvas-nav-${itemIndex}`}
            className={classNames('OffCanvas__subnavToggle', {
              '-toggled': opened,
            })}
          >
            <ChevronIcon />
          </Accordion.Toggle>
          <Accordion.Collapse
            eventKey={`offcanvas-nav-${itemIndex}`}
            className="OffCanvas__collapse"
            onEnter={() => setOpened(true)}
            onExit={() => setOpened(false)}
          >
            <SubNavMenu
              i={itemIndex}
              items={item.children}
              parent={item}
              hasThirdLevel={hasThirdLevel}
            />
          </Accordion.Collapse>
        </li>
      </>
    );
  }

  return (
    <li className="OffCanvas__item">
      <Link href="/[slug]" as={item.url}>
        <a className="OffCanvas__link">{item.name}</a>
      </Link>
    </li>
  );
};

const OffCanvasNav = data => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  let LINKS = data.data.data;

  const sidebar = {
    open: {
      x: 0,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        x: { stiffness: 1000 },
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const sectionVariant = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 10,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.div
      className="SiteHeader__menu -mobile"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div className="OffCanvas" variants={sidebar}>
        <button
          className="OffCanvas__toggle -close"
          onClick={() => toggleOpen()}
        ></button>
        <RewardsArea variants={sectionVariant} />
        <motion.div variants={sectionVariant}>
          <Accordion as="ul" className="OffCanvas__nav">
            {LINKS.map((item, i) => (
              <NavItem item={item} key={`offcanvas-item-${i}`} i={i} />
            ))}
          </Accordion>
        </motion.div>
        <motion.div variants={sectionVariant}>
          <form className="OffCanvas__search">
            <div className="Search__inputGroup">
              <label htmlFor="offcanvas-search" className="Search__icon">
                <SearchIcon />
              </label>
              <input
                id="offcanvas-search"
                type="text"
                className="Search__input"
                placeholder="Search Site"
              />
            </div>
            <input
              type="submit"
              className="Search__submit sr-only"
              value="Search"
            />
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OffCanvasNav;
