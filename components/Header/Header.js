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

import api from '../../../services/api';
import acf from '../../../services/acf';

// images
import Hamburger from '../../../assets/hamburger.svg';
import CloseIcon from '../../../assets/close-icon.svg';

const mapStateToProps = state => {
  return { information: state.api,  };
};

export const HeaderComponent = ({ information }) => {
  const location = useLocation();
	const dispatch = useDispatch();
	const [ siteInformation, setSiteInformation ] = useState(undefined);
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const history = useHistory();
  const [ scrollPosition, setSrollPosition ] = useState(null);
  const [ getBookDemo, setBookDemo ] = useState(undefined);

	useEffect(() => {
		const loadSiteInformation = (site) => dispatch(
			{ type: 'LOAD_SITE_INFORMATION', payload: site }
		);
		api.SiteInformation.information()
		.then((data) => {
      api.SiteInformation.logo()
      .then((logo) => {
        loadSiteInformation({
          name: data.name,
          description: data.description,
          home: data.home,
          logo: logo.url
        });
        setSiteInformation({
          name: data.name,
          description: data.description,
          home: data.home,
          logo: logo.url
        });
      });
    });

    const loadBookDemo = (data) => dispatch(
      { type: 'LOAD_BOOK_DEMO', payload: data }
    );

    acf.Content.getOptions('theme-general-settings')
    .then((data) => {
      loadBookDemo(data.acf.book_a_demo);
      setBookDemo(data.acf.book_a_demo);
    });
	}, [ dispatch, location ]);

  return (
			<Navbar fixed='top' color="white" light expand="lg" id="site-header" className="site-header">
			{ siteInformation &&
        <NavbarBrand href="/">
          <img title={ siteInformation.title } alt={ siteInformation.description } src={ siteInformation.logo } className="logo"/>
        </NavbarBrand>
			}

			<NavbarToggler className={ classnames( { 'open' : isOpen } ) } onClick={ toggle }>
        { isOpen ? <CloseIcon className="navbar-toggler-icon" /> : <Hamburger className="navbar-toggler-icon" /> }
      </NavbarToggler>

			<Collapse isOpen={ isOpen } navbar>
				<Nav navbar>
					<Navigation />
				</Nav>

        {
          getBookDemo &&
          <NavbarText className="d-lg-none">
            <FlipButton
              color="primary"
              size="sm"
              block
              title={ getBookDemo.title }
              href={ getBookDemo.url }
              { ...( getBookDemo.target ?
                {
                  target: getBookDemo.target,
                  rel: 'noopener noreferrer'
                } :
                {
                  onClick: () => history.push(getBookDemo.url)
                }
              ) }
            >
              { getBookDemo.title }
            </FlipButton>
          </NavbarText>
        }
			</Collapse>
      { getBookDemo &&
        <NavbarText className="d-none d-lg-inline-block align-self-center">
          <FlipButton
            outline
            color="primary"
            size="sm"
            title={ getBookDemo.title }
            href={ getBookDemo.url }
            { ...( getBookDemo.target ?
              {
                target: getBookDemo.target,
                rel: 'noopener noreferrer'
              } :
              {
                onClick: () => history.push(getBookDemo.url)
              }
            ) }
          >
            { getBookDemo.title }
          </FlipButton>
        </NavbarText>
      }
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
