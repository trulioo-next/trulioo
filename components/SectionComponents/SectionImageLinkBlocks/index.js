import React from 'react';

import Card from 'react-bootstrap/Card';

import './SectionImageLinkBlocks.scss';

const SectionImageLinkBlocks = ({ image_link_blocks }) => {
  return (
    <aside className="Section -ImageLinkBlocks">
      {image_link_blocks.map((block, index) => (
        <Card
          key={index}
          as="a"
          href={block.link.url}
          className="ImageLinkBlock"
          {...(block.link.target && { target: block.link.target })}
        >
          <Card.Img src={block.image.url} alt={block.image.alt} />
          <Card.ImgOverlay className="d-flex align-items-center justify-content-center">
            <span className="card-title text-white">{block.link.title}</span>
          </Card.ImgOverlay>
        </Card>
      ))}
    </aside>
  );
};

export default SectionImageLinkBlocks;
