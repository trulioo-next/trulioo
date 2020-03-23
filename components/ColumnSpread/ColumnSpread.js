import React from 'react';

import Container from 'react-bootstrap/Container';
import './ColumnSpread.scss';

const ColumnSpread = props => {
  return (
    <section className="Section">
      <Container fluid className="px-0">
        <div className={`ColumnSpread -spread-${props.spread}`}>
          {props.children}
        </div>
      </Container>
    </section>
  );
};

export default ColumnSpread;
