import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';

const SectionPostGrid = props => {
  let { posts, category, defaultImage } = props;
  let count = posts.length;
  if(count > 4 ) {
    count = 4;
  }

  console.log('POSTS ', posts )

  return (
    <section className="Section">
      <Container fluid className="px-0">
        <ColumnSpread spread={count}>
          {posts &&
            posts.map((post, sectionKey) => (
              <MediaObjectCard
                key={sectionKey}
                title={post.title}
                image={
                  post.photos
                    ? post.photos[0].url
                    : defaultImage
                }
                product={{
                  href: '/menu/' + category + '/' + post.slug,
                  calories: post.calories,
                }}
                stacked
              >
                <p>{post.description}</p>
              </MediaObjectCard>
            ))}
        </ColumnSpread>
      </Container>
    </section>
  );
};

SectionPostGrid.defaultProps = {};

export default SectionPostGrid;
