import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

import Slider from 'react-slick';

const Tile = ({ data, ...props }) => (
  <Card { ...props }>
    <CardBody>
      <CardTitle tag="h3">{ data.title }</CardTitle>
      <CardText tag="div" dangerouslySetInnerHTML={ { __html: data.description } } />
    </CardBody>
  </Card>
);

const TileGrid = ({ items }) => (
  <Row className="py-md-5">
    <Col className="px-5 px-md-4">
      <div className="tile-grid mb-5">
        {items.map((tile, index) => (
          <Tile data={ tile } key={ index } />
        ))}
      </div>
    </Col>
  </Row>
);

const TileSlider = ({ items }) => {
  const sliderSettings = {
    dots: true,
    arrows: true,
  };

  return (
    <Row className="py-5">
      <Col className="px-0 px-md-4">
        <Slider { ...sliderSettings }>
          {items.map((tile, index) => (
            <div className="px-5" key={ index }>
              <Tile className="mx-5" data={ tile } />
            </div>
          ))}
        </Slider>
      </Col>
    </Row>
  );
};

const TextTiles = ({ items }) => {
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  });

  const breakpoint = 480;

  return width < breakpoint ? <TileSlider items={ items } /> : <TileGrid items={ items } />;
};

export const MultipleRowSection = ({ component }) => (
  <section className="text-tiles-section" style={ { backgroundImage: `url(${ component.background.url })` } }>
    <Container className="py-5">
      <Row className="py-md-5">
        <Col className="px-5 px-md-4">
          <h2 className="text-center mb-3" dangerouslySetInnerHTML={ { __html: component.heading|| 'No HTML' } } />
        </Col>
      </Row>
      { component.list && <TextTiles items={ component.list } /> }
    </Container>
  </section>
);

const tilesProps = {
  items: PropTypes.array,
};

TileGrid.propTypes = tilesProps;
TileSlider.propTypes = tilesProps;
TextTiles.propTypes = tilesProps;

Tile.propTypes = {
  data: PropTypes.object,
};

MultipleRowSection.propTypes = {
  component: PropTypes.object
};

