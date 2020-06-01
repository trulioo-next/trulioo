import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  selectSiteInformation,
  selectGeneralSettings,
} from '@/stores/app/selectors';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from 'reactstrap';
import classnames from 'classnames';
import { FlipButton } from '../FlipButton';

// images
import Hamburger from '../../static/assets/hamburger.svg';
import CloseIcon from '../../static/assets/close-icon.svg';
import AppLogo from '../../static/assets/trulioo-logo.svg';

const mapStateToProps = state => {
  return { information: state.api };
};

export const HeaderComponent = ({ information }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const siteInformation = useSelector(state => selectSiteInformation(state));
  const generalSettings = useSelector(state => selectGeneralSettings(state));

  return (
    <Navbar
      fixed="top"
      color="white"
      light
      expand="lg"
      id="site-header"
      className="site-header"
    >
      {siteInformation && (
        <NavbarBrand href="/">
          <AppLogo
            title={siteInformation.title}
            alt={siteInformation.description}
            src={siteInformation.logo}
            className="logo"
          />
        </NavbarBrand>
      )}

      <NavbarToggler className={classnames({ open: isOpen })} onClick={toggle}>
        {isOpen ? (
          <CloseIcon className="navbar-toggler-icon" />
        ) : (
          <Hamburger className="navbar-toggler-icon" />
        )}
      </NavbarToggler>

      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <Navigation />
        </Nav>

        {generalSettings.acf.book_a_demo && (
          <NavbarText className="d-lg-none">
            <FlipButton
              color="primary"
              size="sm"
              block
              title={generalSettings.acf.book_a_demo.title}
              href={generalSettings.acf.book_a_demo.url}
              {...(generalSettings.acf.book_a_demo.target && {
                target: generalSettings.acf.book_a_demo.target,
                rel: 'noopener noreferrer',
              })}
            >
              {generalSettings.acf.book_a_demo.title}
            </FlipButton>
          </NavbarText>
        )}
      </Collapse>
      {generalSettings.acf.book_a_demo && (
        <NavbarText className="d-none d-lg-inline-block align-self-center">
          <FlipButton
            outline
            color="primary"
            size="sm"
            title={generalSettings.acf.book_a_demo.title}
            href={generalSettings.acf.book_a_demo.url}
            {...(generalSettings.acf.book_a_demo.target && {
              target: generalSettings.acf.book_a_demo.target,
              rel: 'noopener noreferrer',
            })}
          >
            {generalSettings.acf.book_a_demo.title}
          </FlipButton>
        </NavbarText>
      )}
    </Navbar>
  );
};

HeaderComponent.propTypes = {
  information: PropTypes.object.isRequired,
};

HeaderComponent.defaultProps = {
  information: {},
};

export const Header = connect(mapStateToProps)(HeaderComponent);
