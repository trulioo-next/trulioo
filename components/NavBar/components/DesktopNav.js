import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Toolbar from './Toolbar';
import SubNav from './SubNav';
import LocationIcon from '@/static/images/location.svg';
import AccountIcon from '@/static/images/account.svg';
import CaretIcon from '@/static/images/caret-down.svg';

import { userDataSelector } from '@/stores/user/selectors';

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
            <CaretIcon />
          </span>
        </button>
        <SubNav i={i} items={item.children} parent={item} />
      </motion.li>
    );
  }

  return (
    <li className={itemClassnames}>
      {item.name != 'Slurpee®' && (
        <Link href={item.url} replace={true}>
          <a className="SiteHeader__link">{item.name}</a>
        </Link>
      )}
      {item.name === 'Slurpee®' && (
        <a  href={item.url}
            className="SiteHeader__link"
            target="_blank"
            rel="noopener noreferrer"
        >
          {item.name}
        </a>
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
  const userData = useSelector(state => userDataSelector(state));
  let userAccount =
    userData && userData.auth.isAuth
      ? `${userData.user.rewards_points} PTS`
      : 'Account';

  let accountSigned =  userData && userData.auth.isAuth
      ? `account__active`
      : '';

  let accountLink =  userData && userData.auth.isAuth
      ? `/7rewards/`
      : '/7rewards/signin';     

  return (
    <>
      {LINKS && (
        <>
          <ul className="SiteHeader__menu -desktop">
            {LINKS.map((link, i) => {
              searchIndex += 1;
              // console.log('PRIMARY NAV CHILDREN  ', link.children )
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
            <Toolbar.Item url="https://stores.7-eleven.ca/" target="_blank">
              <Toolbar.Icon>
                <LocationIcon />
              </Toolbar.Icon>
              <Toolbar.Label>Find A Store</Toolbar.Label>
            </Toolbar.Item>
            <Toolbar.Item url={accountLink}>
              <Toolbar.Icon>
                <span className={accountSigned}><AccountIcon /></span>
              </Toolbar.Icon>
              <Toolbar.Label ><span className={accountSigned}>{userAccount}</span></Toolbar.Label>
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
