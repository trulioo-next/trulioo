import React, { Fragment, useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SectionSlurpeeTrivia.scss';

const ImageGrid = ({ data, windowWidth }) => {
  const breakpoint = 576;
  return windowWidth < breakpoint ? (
    <div className="SlurpeeTrivia__imageGrird">
      <Row className="SlurpeeTrivia__imageRow">
        {data.map(({ row }, index) => (
          <Fragment key={index}>
            {row.map(({ image }, index) => (
              <Col key={index} className="SlurpeeTrivia__imageColumn">
                <img
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </Col>
            ))}
          </Fragment>
        ))}
      </Row>
    </div>
  ) : (
    <div className="SlurpeeTrivia__imageGrid">
      {data.map(({ row }, index) => (
        <Row key={index} className="SlurpeeTrivia__imageRow">
          {row.map(({ image }, index) => (
            <Col key={index} className="SlurpeeTrivia__imageColumn">
              <img
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

const SectionSlurpeeTrivia = ({
  heading,
  image_grid,
  settings,
  subheading,
  trivia,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <section
      className="Section -SlurpeeTrivia"
      style={{
        ...(settings.background && {
          ...(settings.background.color && {
            backgroundColor: settings.background.color,
          }),
          ...(settings.background.image && {
            backgroundImage: `url(${settings.background.image.url})`,
            backgroundSize: settings.background.size,
            backgroundRepeat: settings.background.repeat
              ? 'repeat'
              : 'no-repeat',
            backgroundPosition: settings.background.position,
          }),
        }),
      }}
    >
      <Container className="Section__container">
        <Row className="align-items-center">
          <Col xs="12" md="6" className="col">
            {image_grid && (
              <ImageGrid data={image_grid} windowWidth={windowWidth} />
            )}
          </Col>
          <Col xs="12" md="6" className="SlurpeeTrivia__contentColumn col">
            <header className="Section__header">
              {heading && (
                <h2 className="Section__title">
                  {heading.type === 'image' && heading.image ? (
                    <img src={heading.image.url} alt={heading.image.alt} />
                  ) : (
                    heading.text
                  )}
                </h2>
              )}
              {subheading && (
                <h3 className="Section__subheading h2">{subheading}</h3>
              )}
            </header>
            {trivia && (
              <ul className="SlurpeeTrivia__list">
                {trivia.map(({ fact }, index) => (
                  <li key={index} className="SlurpeeTrivia__listItem">
                    <span className="SlurpeeTrivia__fact">{fact}</span>
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SectionSlurpeeTrivia;
