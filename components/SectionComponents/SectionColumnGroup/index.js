import React, { useEffect, useState } from 'react';

import ColumnGroup from '@/components/ColumnGroup';

const SectionColumnGroup = props => {
  console.log('SectionColumnGroup  PROPS :: ', props);

  return (
    <section className="Section">
      <div className="container-fluid px-0">
        <ColumnGroup>
           
        </ColumnGroup>
      </div>
    </section>
  );
};

SectionColumnGroup.defaultProps = {};

export default SectionColumnGroup;
