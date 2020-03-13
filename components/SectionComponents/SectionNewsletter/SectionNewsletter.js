import classNames from 'classnames';
import React from 'react';

import Subscribe from '@/components/Subscribe';

import './Newsletter.scss';

const SectionNewsletter = ({ data }) => {
  const bgImage = data.background_image;
  const sectionClasses = classNames('Newsletter__section', 'Section', {
    '-bg-img': bgImage ? true : false,
  });
  let mobileBg = bgImage.mobile;
  let desktopBg = bgImage.desktop;

  return (
    <section className={sectionClasses}>
      {mobileBg && (
        <img
          className="Section__bgImage -mobile"
          src={mobileBg.url}
          width={mobileBg.width}
          height={mobileBg.height}
          alt={mobileBg.alt}
        />
      )}
      {desktopBg && (
        <img
          className="Section__bgImage -desktop"
          src={desktopBg.url}
          width={desktopBg.width}
          height={desktopBg.height}
          alt={desktopBg.alt}
        />
      )}
      <div
        className="container Section__container"
        style={{ color: data.text_color }}
      >
        <div className="row align-self-center align-items-top justify-content-between justify-content-lg-around">
          <div className="col col-5">
            <h2 className="Newsletter__title Section__title">{data.title}</h2>
            <div
              className="Newsletter__text"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
          </div>
          <div className="col col-6 col-lg-5">
            <Subscribe prefix="Newsletter" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNewsletter;
