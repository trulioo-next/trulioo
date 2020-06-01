import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Nav,
	NavItem,
	NavLink,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Card,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectHeaderData } from '@/stores/app/selectors';

import { FlipButton } from '../FlipButton';

export const Navigation = () => {
  const headerData = useSelector(state =>  selectHeaderData(state));

  const buildMenu = (headerData) => {
    if (headerData) {
			const navigationMenu = [];

			headerData.menu.map((item, index) => {
				if (item.title === 'Home') {
					item.url = '/';
				}
				navigationMenu.push(item);
			});

			return [
				navigationMenu && navigationMenu.map((item) => {
					if (item.sub_nav) {
						return (
							<UncontrolledDropdown className="dropdown-nav-link" nav inNavbar key={ item.ID }>
                <DropdownToggle nav>{ item.title }</DropdownToggle>
                <DropdownMenu className="dropdown-nav-menu">
                  {
                    (item.attr_title || item.description || (item.sublink && item.subtitle)) &&
                    <div className="dropdown-nav-menu-description mb-5 mb-lg-0">
                      { item.attr_title && <strong className="d-block h6 text-primary">{item.attr_title}</strong> }
                      { item.description && <p>{item.description}</p> }
                      { item.acf.button &&
                        <div className="card-link">
                          <FlipButton
                            className="d-block d-md-inline-block"
                            color="primary"
                            size="sm"
                            title={ item.acf.button.title }
                            href={ item.acf.button.url }
                            { ...( item.acf.button.target &&
                              {
                                target: item.acf.button.target,
                                rel: 'noopener noreferrer'
                              }
                            ) }
                          >{ item.acf.button.title }</FlipButton>
                        </div>
                      }
                    </div>
                  }
                  <div className="dropdown-nav-menu-links">
                    <ul className="dropdown-nav-menu-list">
                      { item.sub_nav.map((menu, index) =>
                        (
                          <li key={ menu.ID }>
                            <NavLink
                              className="div-links"
                              title={ menu.title }
                              href={ menu.url }
                              >
                              { menu.title }
                            </NavLink>
                          </li>
                        )
                        )}
                    </ul>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
						);
					} else {
            return (
              <NavItem key={ item.ID }>
                {console.log('dd', item.target)}
                { (item.target === "") && 
							  <NavLink href={ item.url }>{ item.title }</NavLink>
                }
                { (item.target === "_blank") && 
                  <a href={ item.url } target="_blank" className="nav-link">{ item.title }</a>
                }
							</NavItem>
						);
					}
				})
			];
    }
    return null;
  };
  return (
		<Fragment>
	    {buildMenu(headerData)}
		</Fragment>
  );
};
