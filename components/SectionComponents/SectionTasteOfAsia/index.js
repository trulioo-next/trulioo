import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Container from 'react-bootstrap/Container';
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';
import Button from '@/components/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SectionTasteOfAsia.scss';

const SectionTasteOfAsia = props => {
  const [lang, setLang] = useState('english_content');

  const langOptions = {
    English: 'english_content',
    Chinese: 'chinese_content',
    Hindi: 'hindi_content',
    Tagalog: 'tagalog_content',
  };

  let { title, description, products } = props;

  return (
    <section className="Section -TasteOfAsia">
      <Container className="Section__container">
        <Row className="align-items-center justify-content-center text-center">
          <Col className="col" xs="12" md="10">
            {title && <h2 className="Section__title">{title}</h2>}
            {description && (
              <div
                className="Section__content"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </Col>
        </Row>
        <Row className="my-5">
          <Col className="col" xs="12">
            <div className="TasteOfAsia__languageSwitcher">
              {Object.entries(langOptions).map(([key, value], i) => (
                <Button
                  className={classNames('TasteOfAsia__languageToggle', {
                    '-active': lang === value,
                  })}
                  type="button"
                  onClick={() => setLang(value)}
                  key={`language-toggle-${i}`}
                >
                  {key}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        <ColumnSpread spread={4}>
          {products &&
            products.map(({ product }, sectionKey) => {
              const [show, setShow] = useState(false);
              const handleClose = () => setShow(false);
              const handleShow = () => setShow(true);

              const productImage = product.image
                ? product.image.url
                : '/static/images/placeholders/NewYorkDeliMeatLovers.png';

              return (
                <MediaObjectCard
                  key={sectionKey}
                  title={product[lang].title}
                  image={productImage}
                  stacked
                  className="TasteOfAsia__card"
                >
                  <p className="d-md-none">{product[lang].description}</p>
                  <Button
                    className="d-none d-md-block"
                    type="button"
                    onClick={handleShow}
                  >
                    View Details
                  </Button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    centered
                    size="lg"
                    className="TasteOfAsia__modal"
                  >
                    <Modal.Header closeButton />
                    <Modal.Body>
                      <Row>
                        <Col
                          className="col TasteOfAsia__modalImage"
                          xs="12"
                          md="6"
                        >
                          <img src={productImage} />
                        </Col>
                        <Col className="col" xs="12" md="6">
                          <h2 className="Modal__heading">
                            {product[lang].title}
                          </h2>
                          <div className="Modal__content">
                            <p>{product[lang].description}</p>
                          </div>
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>
                </MediaObjectCard>
              );
            })}
        </ColumnSpread>
      </Container>
    </section>
  );
};

SectionTasteOfAsia.defaultProps = {};

export default SectionTasteOfAsia;