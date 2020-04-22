import React, { useEffect, useState } from 'react';

import ColumnGroup from '@/components/ColumnGroup';

const SectionColumnGroup = props => {
  // console.log('SectionColumnGroup  PROPS :: ', props);

  return (
    <section className="Section">
      <div className="container-fluid px-0">
        <ColumnGroup>
          {props.blocks.map((item, i) => {
            return (
              <ColumnGroup.Item
                item={item}
                i={i}
                key={`column-group-item-${i}`}
              />
            );
          })}
        </ColumnGroup>
      </div>
    </section>
  );
};

SectionColumnGroup.defaultProps = {};

export default SectionColumnGroup;
