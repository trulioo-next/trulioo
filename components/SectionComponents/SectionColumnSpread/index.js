import React, { useEffect, useState } from 'react';

import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';

const SectionColumnSpread = props => {
  // console.log('SectionColumnSpread  PROPS :: ', props);

  return (
    <section className="Section">
      <div className="container-fluid px-0">
        <ColumnSpread spread="3">
          {props.blocks.map((item, i) => {
            return (
              <MediaObjectCard
                title={item.title}
                image={item.image.url}
                stacked
                key={i}
              >
                {item.excerpt}
              </MediaObjectCard>
            );
          })}
        </ColumnSpread>
      </div>
    </section>
  );
};

SectionColumnSpread.defaultProps = {};

export default SectionColumnSpread;
