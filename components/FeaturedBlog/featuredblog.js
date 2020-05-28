import React from 'react';
import PropTypes from 'prop-types';

import {
  LatestPost,
  PostCard,
} from '../../components/Post';

import {
  Container,
  Row,
  Col,
  CardDeck
} from 'reactstrap';

export const FeaturedBlog = ({ isSearching, data }) => {
  const firstPost = data && data[0];

  return (
    <section className={ 'blog-section featured-blog ' + (isSearching ? 'd-none' : '') }>
      <Container className="latest-post-section px-5 my-5 py-md-5">
        { firstPost && <LatestPost post={ firstPost } /> }
      </Container>
      <Container fluid className="px-0 post-cards-section bg-gray py-5">
        <Container className="px-5 py-md-5">
          <Row>
            <Col>
              <CardDeck>
                { data && data.map((post, index) => {
                  return (index !== 0) && (
                  <PostCard key={ index } post={ post } />
                  );
                })}
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

FeaturedBlog.propTypes = {
  data: PropTypes.array,
  isSearching: PropTypes.any,
};

FeaturedBlog.defaultProps = {
  data: [],
  isSearching: false,
};
