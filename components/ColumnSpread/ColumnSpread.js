import React from 'react';

import Container from 'react-bootstrap/Container';
import './ColumnSpread.scss';

const ColumnSpread = props => {
  return (
    <div className={`ColumnSpread -spread-${props.spread} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default ColumnSpread;
