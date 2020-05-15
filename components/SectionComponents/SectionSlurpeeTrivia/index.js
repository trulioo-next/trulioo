import React, { Fragment, useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SectionSlurpeeTrivia.scss';

const SectionHeader = ({ heading, subheading }) => {
  return (
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
        <h3 className="Section__subheading h2 text-center text-md-left">
          {subheading}
        </h3>
      )}
    </header>
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
        {windowWidth < 576 && (
          <SectionHeader heading={heading} subheading={subheading} />
        )}
        <Row className="align-items-center">
          <Col xs="12" md="6" className="col">
            {image_grid && (
              <div className="SlurpeeTrivia__imageGrid my-3">
                {image_grid.map(({ row }, index) => (
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
            )}
          </Col>
          <Col xs="12" md="6" className="SlurpeeTrivia__contentColumn col">
            {windowWidth > 576 && (
              <SectionHeader heading={heading} subheading={subheading} />
            )}
            {trivia && (
              <ul className="SlurpeeTrivia__list px-4 px-md-0">
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
