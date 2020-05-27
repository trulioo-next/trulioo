import React, { useState, useEffect } from 'react';
import { Navigation }  from './navigation';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const mapStateToProps = state => {
  return { information: state.api,  };
};

export const HeaderComponent = ({ information }) => {


  return (
			<Navbar fixed='top' color="white" light expand="lg" id="site-header" className="site-header">
			
    </Navbar>
  );
};

HeaderComponent.propTypes = {
  information: PropTypes.object.isRequired,
};

HeaderComponent.defaultProps = {
  information: {}
};

export const Header= connect(mapStateToProps)(HeaderComponent);
