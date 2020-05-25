import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
 
export const Tnc = () => {
  const dispatch = useDispatch();
  const [ subFooterList, setSubFooterList ] = useState(undefined);
  const getCurrentYear = new Date().getFullYear();

  useEffect(() => {
    // return state here 
    //
  }, [ dispatch ]);

  return (
    <div className="d-flex mb-5 mt-5 mt-md-5 footer__tnc">
      <p className="mb-5 mb-md-2">&#169; Copyright {getCurrentYear}, Trulioo. All rights reserved.</p>
      <ul className="px-0 mb-2">
        { subFooterList ?
          subFooterList.map((item, index) =>
          <Fragment key={ index }>
            { index > 0 && <span className="px-1 px-md-3">|</span> }
            <a href={ item.url } title={ item.title }>
              { item.title }
            </a>
          </Fragment>
          ) : (
           null
        )}
      </ul>
    </div>
  );
};
