import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { autop } from '@wordpress/autop';
import truncate from 'truncate-html';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import YouTubePlayer from 'react-player/lib/players/YouTube';

export const ResourceCard = ({ item }) => {
  let linkType, resourceLink;

  if (item.acf) {
    if (item.acf.video_link) {
      linkType = 'video';
    } else if (item.acf.gated_landing_page) {
      linkType = 'gated';
    }
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const cardProps = {};

  switch (linkType) {
    case 'video':
      resourceLink = item.acf.video_link;
      cardProps.onClick = () => toggle();
      cardProps.tag = 'div';
      break;

    case 'gated':
      resourceLink = item.acf.gated_landing_page;
      cardProps.tag = 'a';
      cardProps.href = resourceLink;
      break;

    /**
     * TODO: Add support for non-gated content.
     */

    default:
      cardProps.tag = 'article';
      break;
  }

  const types = item.resource_types || item.types;

  return (
    <Card className="resources-card" {...cardProps}>
      {types.map((type, index) => {
        return (
          <span
            className="type-label text-white"
            key={index}
            style={{ backgroundColor: type.color || '#1BA5EA' }}
          >
            {type.name}
          </span>
        );
      })}
      {item.featured_image && (
        <div className="card-image">
          <CardImg
            className="d-block h-100"
            top
            width="100%"
            src={item.featured_image}
          />
        </div>
      )}
      <CardBody>
        <CardTitle
          tag="h3"
          className="display-4 mb-4"
          dangerouslySetInnerHTML={{
            __html: item.title ? item.title.rendered : item.content.post_title,
          }}
        />
        <CardText
          tag="div"
          className="mt-4 content-block"
          dangerouslySetInnerHTML={{
            __html: item.excerpt
              ? item.excerpt.rendered.split('</p>')[0]
              : autop(
                  item.content.post_excerpt ||
                    truncate(
                      item.content.post_content || item.content.rendered,
                      100,
                      { keepWhitespaces: true, stripTags: true },
                    ),
                ).split('</p>')[0],
          }}
        />
        {linkType === 'video' && (
          <Modal isOpen={modal} toggle={toggle} size="lg" centered>
            <ModalHeader toggle={toggle}>{item.content.post_title}</ModalHeader>
            <ModalBody>
              <div className="embed-responsive embed-responsive-16by9">
                <YouTubePlayer
                  playing={toggle}
                  url={resourceLink}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </ModalBody>
          </Modal>
        )}
      </CardBody>
    </Card>
  );
};

ResourceCard.propTypes = {
  item: PropTypes.object,
};
