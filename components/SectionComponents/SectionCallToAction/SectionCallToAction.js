import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';

import Button from '@/components/Button';

import './SectionCallToAction.scss';

let hasMedia = false;

const SectionMedia = ({ media }) => {
  let mediaItem;
  let type = media.type;

  switch (type) {
    case 'image':
      mediaItem = (
        <img
          src={media.image.url}
          width={media.image.width}
          height={media.image.height}
          alt={media.image.alt}
        />
      );
      break;
    case 'video':
      // TODO: Video markup.
      break;
  }

  return <div className="col col-12 col-lg-5 Section__media">{mediaItem}</div>;
};

const SectionCTA = ({ data, i }) => {
  const params = {
    href: data.url,
    as: data.url,
    target: data.target ? data.target : '_self',
  };

  if (i === 0) {
    return (
      <Button className="Section__cta" {...params}>
        {data.title}
      </Button>
    );
  }

  return (
    <Link {...params}>
      <a className="Section__cta">{data.title} &rsaquo;</a>
    </Link>
  );
};

const SectionBody = props => {
  const data = props.data;

  const mobileColumnSize = hasMedia ? 12 : 8;
  const desktopColumnSize = hasMedia ? 5 : 6;

  const bodyClasses = classNames(
    props.className,
    'Section__body',
    'col',
    `col-${mobileColumnSize}`,
    `col-lg-${desktopColumnSize}`,
    { 'offset-lg-1': hasMedia },
    `text-${data['text_alignment'].mobile}`,
    `text-lg-${data['text_alignment'].desktop}`,
  );

  return (
    <div className={bodyClasses}>
      {data.eyebrow && <span className="Section__eyebrow">{data.eyebrow}</span>}
      {data.title && <h2 className="Section__title">{data.title}</h2>}
      {data.subheading && (
        <h3 className="Section__subheading">{data.subheading}</h3>
      )}
      {data.content && (
        <div
          className="Section__text"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      )}
      {data.ctas && (
        <div className="Section__actions">
          {data.ctas.map((data, i) => (
            <SectionCTA data={data.item} i={i} key={`cta-${i}`} />
          ))}
        </div>
      )}
      {props.children}
    </div>
  );
};

const SectionCallToAction = ({
  params,
  media,
  content,
  className,
  children,
}) => {
  hasMedia = params['add_media_column'];

  let mobileAlignment = 'center';
  let desktopAlignment = null;

  if (!hasMedia) {
    mobileAlignment = content.position.mobile;
    desktopAlignment = `justify-content-lg-${content.position.desktop}`;
  }

  let rowClasses = classNames(
    'row',
    'w-100',
    'align-items-center',
    `justify-content-${mobileAlignment}`,
    desktopAlignment,
  );

  let bgImage = params['background_image'];

  return (
    <section
      className={classNames('Section', className)}
      style={{
        color: params['text_colour'],
        backgroundColor: params['background_colour'],
      }}
    >
      {bgImage && (
        <img
          className="Section__bgImage"
          src={bgImage.url}
          width={bgImage.width}
          height={bgImage.height}
          alt={bgImage.alt}
        />
      )}
      <div
        className={classNames(
          'container',
          'Section__container',
          'd-flex',
          'align-items-stretch',
          {
            '-overlay': bgImage ? true : false,
          },
        )}
      >
        <div className={rowClasses}>
          {hasMedia && <SectionMedia media={media} />}
          <SectionBody data={content}>{children}</SectionBody>
        </div>
      </div>
    </section>
  );
};

SectionCallToAction.Media = SectionMedia;
SectionCallToAction.Body = SectionBody;

export default SectionCallToAction;
