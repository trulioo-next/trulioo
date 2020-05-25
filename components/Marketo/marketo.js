import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ContentLeft } from './content-left';
import { ContentRight } from './content-right';
import { ContentCenter } from './content-center';
import { TwoColumnContentLeft } from './two-column-content-left';
import { TwoColumnContentRight } from './two-column-content-right';


export const Marketo = ({ component }) => {

  const [ loader, setLoader ] = useState(true);
  const [ getMarketoComponent, setMarketoComponent ] = useState(undefined);
  
  useEffect(() => {

    const isMounted = loader;
    
    if (isMounted) {
      setMarketoComponent(component);
    }
	  return () => {
			setLoader(false);
		};
  }, [ loader ]); /* eslint-disable-line */
  
  const componentSections = (getMarketoComponent) => {
    switch (getMarketoComponent.position) {
      case 'right':
        return <ContentRight component={ getMarketoComponent }/>;
      case 'center':
        return <ContentCenter component={ getMarketoComponent }/>;   
      case 'left':
        return <ContentLeft component={ getMarketoComponent }/>;
      case 'twocolumnleft':
        return <TwoColumnContentLeft component={ getMarketoComponent }/>;     
      case 'twocolumnright':
        return <TwoColumnContentRight component={ getMarketoComponent }/>;   
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {getMarketoComponent && componentSections(getMarketoComponent)}
    </Fragment>
  );
};

Marketo.propTypes = {
  component: PropTypes.object
};
