import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { selectFooterData } from '@/stores/app/selectors';


const mapStateToProps = state => {
  return { information: state.app.globalData };
};

const SubNavigationList = ({ information }) => {

  const dispatch = useDispatch();
  const [ subFooterList, setSubFooterList ] = useState(undefined);
  const footerData = useSelector(state =>  selectFooterData(state));
  
  // 
  console.log('FOOTER DATA ', footerData )

  return (
    <div className="d-flex justify-content-between Footer__subnav mb-5">
        <a className="navbar-item" href='/'>
          {/*<img title={ information.title } alt={ information.description } src={ information.logo }/>*/}
        </a>
      <ul className="socialIcons">
        { subFooterList ?
          subFooterList.social.map((social, index) =>
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
