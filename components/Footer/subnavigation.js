import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {connect, useDispatch,  useSelector } from 'react-redux';
import { selectSiteInformation, selectGeneralSettings } from '@/stores/app/selectors';

import AppLogo from '../../static/assets/trulioo-logo.svg';

const mapStateToProps = state => {
  return { information: state.app.globalData };
};

const SubNavigationList = ({ information }) => {

  const dispatch = useDispatch();
  const siteInformation = useSelector(state =>  selectSiteInformation(state));
  const generalSettings = useSelector(state =>  selectGeneralSettings(state));

  return (
    <div className="d-flex justify-content-between Footer__subnav mb-5">
        <a className="navbar-item" href='/'>
          <AppLogo title={ siteInformation.title } alt={ siteInformation.description } src={ siteInformation.logo } className="logo"/>
        </a>
        <ul className="socialIcons">
        { generalSettings.acf.social ?
          generalSettings.acf.social.map((social, index) =>
          <a className="socialIcon pl-4" href={ social.link } key={ index } title={ social.title }>
            <ion-icon name={ `logo-${ social.slug }` }></ion-icon>
          </a>
          ) : (
           null
        )}
      </ul>
    </div>
  );
};

SubNavigationList.propTypes = {
  information: PropTypes.object.isRequired,
};

SubNavigationList.defaultProps = {
  information: {}
};

export const SubNavigation = connect(mapStateToProps)(SubNavigationList);
