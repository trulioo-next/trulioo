import classNames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import Video from '@/components/Video';
import Modal from '@/components/Modal';

import './SectionCallToAction.scss';

let hasMedia = false;

const SectionMedia = ({ media }) => {
  let mediaItem;
  let type = media.type;
  let colSize;

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
      colSize = 5;
      break;
    case 'video':
      mediaItem = (
        <Video
          poster={media.image.url}
          video={media.video}
          className="Section__video"
        />
      );
      colSize = 6;
      break;
  }

  return (
    <div className={`col col-12 col-md-${colSize} Section__media`}>
      {mediaItem}
    </div>
  );
};

const SectionCTA = ({ data: { item, ...options }, i }) => {

  if (!item) {
    return (<></>)
  }

  let url = "/";
  if (item && item.url) {
    url = item.url;
  }

  const params = {
    href: item.url,
    as: item.target ? null : item.url,
    target: item.target ? item.target : null,
  };


  if (i === 0) {
    const { style, styleClassName } = getCTAButtonStyle({ ...options });
    const className = 'Section__cta' + (styleClassName ? ' ' + styleClassName : '');

    return (
      <React.Fragment>
        {style &&
          <style>{style}</style>
        }
        <Button className={className} {...params}>
          {item.title}
        </Button>
      </React.Fragment>
    );
  }

  if (item.target) {
    return (
      <a className="Section__cta" {...params}>
        {item.title} &rsaquo;
      </a>
    );
  }

  return (
    <Link {...params}>
      <a className="Section__cta">{item.title} &rsaquo;</a>
    </Link>
  );
};

const getCTAButtonStyle = options => {
  const uid = "cta__" + Math.random().toString(36).substr(2, 9);

  let style = '';
  if (options['text_colour']) {
    style += 'color: ' + options['text_colour'] + ' !important;';
  }
  if (options['background_colour']) {
    style += 'background-color: ' + options['background_colour'] + ' !important;';
  }
  if (style !== '') {
    style = '.' + uid + ' {' + style + '}';
  }

  let hoverStyle = '';
  if (options['hover_text_colour']) {
    hoverStyle += 'color: ' + options['hover_text_colour'] + ' !important;';
  }
  if (options['hover_background_colour']) {
    hoverStyle += 'background-color: ' + options['hover_background_colour'] + ' !important;';
  }
  if (hoverStyle !== '') {
    hoverStyle = '.' + uid + ':hover, .' + uid + ':focus {' + hoverStyle + '}';
  }

  return { style: style + hoverStyle, styleClassName: uid };
}


const SectionBody = props => {
  const data = props.data;

  const mobileColumnSize = hasMedia ? 12 : 8;
  const desktopColumnSize = hasMedia ? 5 : 6;

  const bodyClasses = classNames(
    props.className,
    'Section__body',
    'col',
    `col-${mobileColumnSize}`,
    { 'col-md-6': hasMedia },
    `col-lg-${desktopColumnSize}`,
    `text-${(data && data.text_alignment && data.text_alignment.mobile) || 'center'}`,
    `text-lg-${(data && data.text_alignment && data.text_alignment.desktop) || 'center'}`,
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
            <SectionCTA data={data} modal={false} i={i} key={`cta-${i}`} />
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
  hasMedia = params && params.add_media_column;

  let mobileAlignment = 'center';
  let desktopAlignment = 'around';


  // console.log('SECTION CTA PROPS ', media )

  if (!hasMedia) {
    mobileAlignment = (content && content.position && content.position.mobile) || "start";
    desktopAlignment = (content && content.position && content.position.desktop) || "start";
  }

  let rowClasses = classNames(
    'row',
    'align-items-center',
    `justify-content-${mobileAlignment}`,
    { 'justify-content-md-between': hasMedia },
    `justify-content-lg-${desktopAlignment}`,
  );

  let bgImage = (params && params.background_image) || '';
  let mobileBg = (bgImage && bgImage.mobile) || '';
  let desktopBg = (bgImage && bgImage.desktop) || '';

  return (
    <section
      className={classNames('Section', className, {
        '-bg-img': bgImage ? true : false,
      })}
      style={{
        color: (params && params.text_color && params.text_color) || '#ffffff',
        backgroundColor: (params && params.background_color) || '#000000',
      }}
    >
      {mobileBg && (
        <img
          className="Section__bgImage -mobile"
          src={mobileBg.url}
          width={mobileBg.width}
          height={mobileBg.height}
          alt={mobileBg.alt}
          style={{
            objectFit: params.background_size,
            objectPosition: params.background_position,
          }}
        />
      )}
      {desktopBg && (
        <img
          className="Section__bgImage -desktop"
          src={desktopBg.url}
          width={desktopBg.width}
          height={desktopBg.height}
          alt={desktopBg.alt}
          style={{
            objectFit: params.background_size,
            objectPosition: params.background_position,
          }}
        />
      )}
      <div className={classNames('container', 'Section__container')}>
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

export { SectionCallToAction, SectionCTA };
