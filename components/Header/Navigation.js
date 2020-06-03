import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectHeaderData } from '@/stores/app/selectors';

import { FlipButton } from '../FlipButton';

export const Navigation = () => {
  const headerData = useSelector(state => selectHeaderData(state));

  const buildMenu = headerData => {
    if (headerData) {
      const navigationMenu = [];

      headerData.menu.map((item, index) => {
        if (item.title === 'Home') {
          item.url = '/';
        }
        navigationMenu.push(item);
      });

      return [
        navigationMenu &&
          navigationMenu.map(item => {
            if (item.sub_nav) {
              return (
                <UncontrolledDropdown
                  className="dropdown-nav-link"
                  nav
                  inNavbar
                  key={item.ID}
                >
                  <DropdownToggle nav>{item.title}</DropdownToggle>
                  <DropdownMenu className="dropdown-nav-menu">
                    {(item.attr_title ||
                      item.description ||
                      (item.sublink && item.subtitle)) && (
                      <div className="dropdown-nav-menu-description mb-5 mb-lg-0">
                        {item.attr_title && (
                          <strong className="d-block h6 text-primary">
                            {item.attr_title}
                          </strong>
                        )}
                        {item.description && <p>{item.description}</p>}
                        {item.acf.button && (
                          <div className="card-link">
                            {item.acf.button.target ? (
                              <FlipButton
                                className="d-block d-md-inline-block"
                                color="primary"
                                size="sm"
                                href={item.acf.button.url}
                                target={item.acf.button.target}
                                rel="noopener noreferrer"
                              >
                                {item.acf.button.title}
                              </FlipButton>
                            ) : (
                              <Link href={item.acf.button.url}>
                                <FlipButton
                                  className="d-block d-md-inline-block"
                                  color="primary"
                                  size="sm"
                                >
                                  {item.acf.button.title}
                                </FlipButton>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="dropdown-nav-menu-links">
                      <ul className="dropdown-nav-menu-list">
                        {item.sub_nav.map((menu, index) => (
                          <li key={menu.ID}>
                            {menu.target ? (
                              <NavLink
                                className="div-links"
                                href={menu.url}
                                target={menu.target}
                                rel="noopener noreferrer"
                              >
                                {menu.title}
                              </NavLink>
                            ) : (
                              <Link href={menu.url}>
                                <NavLink className="div-links">
                                  {menu.title}
                                </NavLink>
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
              );
            } else {
              return (
                <NavItem key={item.ID}>
                  {item.target ? (
                    <NavLink
                      href={item.url}
                      target={item.target}
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <Link href={item.url}>
                      <NavLink>{item.title}</NavLink>
                    </Link>
                  )}
                </NavItem>
              );
            }
          }),
      ];
    }
    return null;
  };
  return <Fragment>{buildMenu(headerData)}</Fragment>;
};
