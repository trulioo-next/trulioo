import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

import api from '../../../services/api';
import acf from '../../../services/acf';
import { FlipButton } from '../FlipButton';

export const Navigation = () => {
	const dispatch = useDispatch();
	const [ menuList, setMenuList ] = useState(undefined);

	useEffect(() => {
		const loadMenu = (menu) => dispatch(
			{ type: 'LOAD_MENU', payload: menu }
		);

		api.Menus.bySlug('main')
		.then((data) => {
			loadMenu(data.menu);
			setMenuList(data.menu);
		});

  }, [ dispatch ]);

  const buildMenu = (menuList) => {
    if (menuList) {
			const navigationMenu = [];

			menuList.map((item, index) => {
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
							  <NavLink href={ item.url }>{ item.title }</NavLink>
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
			{buildMenu(menuList)}
		</Fragment>
  );
};