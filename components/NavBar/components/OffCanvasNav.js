import React from 'react';
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import Accordion from 'react-bootstrap/Accordion';

import SearchIcon from '@/static/images/search.svg';
import ChevronIcon from '@/static/images/caret-down.svg';

import linkData from '../placeholder-links.json'; // replace with real data later

const RewardsArea = () => (
  <div className="OffCanvas__rewards">
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
  </div>
);

const NavToggle = props => (
  <button role="tab" className="OffCanvas__toggle -menu" onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </button>
);

const NestedSubNav = props => {
  let items = props.items;
  let subnavIndex = props.i;
  let parentIndex = props.parentIndex;

  return (
    <ul className="OffCanvas__subnav -nested">
      {items.map(({ href, as, label }, index) => (
        <li
          key={`offcanvas-nav-${parentIndex}-subnav-${subnavIndex}-item-${index}`}
          className="OffCanvas__subnavItem"
        >
          <Link href={href} as={as}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NavItem = props => {
  let item = props.item;
  let itemIndex = props.i;

  if (item.subnav) {
    let items = item.subnav;
    let hasThirdLevel = false;
    var i,
      l = items.length;

    for (i = 0; i < l; i += 1) {
      if (items[i].subnav) {
        hasThirdLevel = true;
        break;
      }
    }

    return (
      <>
        <li className="OffCanvas__item">
          <Link href={item.href} as={item.as}>
            <a className="OffCanvas__link">{item.label}</a>
          </Link>
          <Accordion.Collapse
            eventKey={`offcanvas-nav-${itemIndex}`}
            className="OffCanvas__collapse"
          >
            <ul className="OffCanvas__subnav">
              {item.subnav.map(({ href, as, label, subnav }, index) => (
                <li
                  key={`offcanvas-nav-${itemIndex}-subnav-item-${index}`}
                  className="OffCanvas__subnavItem"
                >
                  <Link href={href} as={as}>
                    <a
                      className={
                        hasThirdLevel ? 'OffCanvas__subnavHeading' : ''
                      }
                    >
                      {label}
                    </a>
                  </Link>
                  {subnav && (
                    <NestedSubNav
                      items={subnav}
                      i={index}
                      parentIndex={itemIndex}
                    />
                  )}
                </li>
              ))}
            </ul>
          </Accordion.Collapse>
          <Accordion.Toggle
            as="button"
            eventKey={`offcanvas-nav-${itemIndex}`}
            className="OffCanvas__subnavToggle"
          >
            <ChevronIcon />
          </Accordion.Toggle>
        </li>
      </>
    );
  }

  return (
    <li className="OffCanvas__item">
      <Link href={item.href} as={item.as}>
        <a className="OffCanvas__link">{item.label}</a>
      </Link>
    </li>
  );
};

const OffCanvasNav = props => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const sidebar = {
    open: {
      x: 0,
      transition: {
        x: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: '-100%',
      transition: {
        x: { stiffness: 1000 },
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
        <RewardsArea />
        <Accordion as="ul" className="OffCanvas__nav">
          {linkData.map((item, i) => (
            <NavItem item={item} key={`offcanvas-item-${i}`} i={i} />
          ))}
        </Accordion>
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
  );
};

export default OffCanvasNav;
