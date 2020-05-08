import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { motion, useCycle } from 'framer-motion';
import Accordion from 'react-bootstrap/Accordion';

import SearchIcon from '@/static/images/search.svg';
import ChevronIcon from '@/static/images/caret-down.svg';
import { userDataSelector } from '@/stores/user/selectors';

import Button from '@/components/Button';

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

  const userData = useSelector(state => userDataSelector(state));

  function buildLink(url, name) {
    let isRewardsLink = url.split('/7rewards')[1];
    let isMenuLink = url.split('/menu')[1];

    let hrefPath = '/[slug]';
    if (isRewardsLink) {
      hrefPath = isRewardsLink ? `/7rewards/${isRewardsLink}` : '/[slug]';
    }
    if (isMenuLink) {
      hrefPath = isMenuLink ? `/menu/${isMenuLink}` : '/[slug]';
    }
    if (url === '/7rewards') {
      hrefPath = '/7rewards';
    }

    if (url === '/') {
      hrefPath = '/';
    }

    if (!isRewardsLink && !isMenuLink) {
      hrefPath = '/[slug]';
    }

    return (
      <Link href={url}>
        <a>{name}</a>
      </Link>
    );
  }

  return (
    <>
      {props.items && (
        <ul
          className={classNames('OffCanvas__subnav', { '-nested': isNested })}
        >
          {props.items.map(({ name, url, children }, index) => (
            <li
              key={index}
              className={classNames('OffCanvas__subnavItem', '-nested', {
                col: hasThirdLevel && !isNested,
              })}
            >
              {hasThirdLevel ? (
                <span className="OffCanvas__subnavHeading">{name}</span>
              ) : (
                buildLink(url, name)
              )}
              {children.length > 0 && <SubNavMenu items={children} nested />}
            </li>
          ))}
          {props.parent && props.parent.name === 'Menu' && (
            <li className="OffCanvas__subnavItem -nested col">
              <span className="OffCanvas__subnavHeading">Menu</span>
              <ul className="OffCanvas__subnav -nested">
                <li className="OffCanvas__subnavItem -nested">
                  <a href="/menu">View Full Menu</a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      )}
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
          {item.url !== '#' &&
          <Link href="/[slug]" as={item.url}>
            <a className="OffCanvas__link">{item.name}</a>
          </Link>
          }
          {item.url === '#' &&
          <Accordion.Toggle
            as="a"
            eventKey={`offcanvas-nav-${itemIndex}`}
            className={classNames('OffCanvas__link', {
              '-toggled': opened,
            })}
          >
          {item.name}
          </Accordion.Toggle>
          }
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
              hasThirdLevel={hasThirdLevel}
              parent={item}
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

  const [searchTerm, setSearchTerm] = useState();

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    Router.push('/search?search=' + encodeURIComponent(searchTerm));
  };

  return (
    <motion.div
      className="SiteHeader__menu -mobile"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div className="OffCanvas" variants={sidebar}>
        <span className="OffCanvas__logo"><img src="/static/images/7Eleven-logo-maple-square.png" alt="7Eleven logo" /></span>
        <button
          className="OffCanvas__toggle -close"
          onClick={() => toggleOpen()}
        ></button>
        <motion.div variants={sectionVariant}>
          <Accordion as="ul" className="OffCanvas__nav">
            {LINKS.map((item, index) => (
              <NavItem item={item} key={index} i={index} />
            ))}
          </Accordion>
        </motion.div>
        <motion.div variants={sectionVariant}>
          <form className="OffCanvas__search" onSubmit={handleSearchSubmit}>
            <div className="Search__inputGroup">
              <label htmlFor="offcanvas-search" className="Search__icon">
                <SearchIcon />
              </label>
              <input
                id="offcanvas-search"
                type="text"
                className="Search__input"
                placeholder="Search Site"
                onChange={handleSearchChange}
              />
            </div>
            <Button type="submit" className="Search__submit">Search</Button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OffCanvasNav;
