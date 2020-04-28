import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Link from 'next/link';

import Button from '@/components/Button';
import Video from '@/components/Video';
import CheckBalanceModal from '@/components/CheckBalanceModal';


import { userDataSelector } from '@/stores/user/selectors';

import './SectionGiftCardBalance.scss';

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
  
//
const SectionBody = props => {
  const data = props.data;

  const mobileColumnSize = hasMedia ? 12 : 8;
  const desktopColumnSize = hasMedia ? 5 : 6;
  const ref = useRef(null);
 
  const handleClick = () => {
    ref.current.showModal();
  };

  console.log('is error ', props.error )
  
  const bodyClasses = classNames(
    props.className,
    'Section__body',
    'col',
    `col-${mobileColumnSize}`,
    { 'col-md-6': hasMedia },
    `col-lg-${desktopColumnSize}`,
    `text-${data.text_alignment.mobile}`,
    `text-lg-${data.text_alignment.desktop}`,
  );

  return (
    <div className={bodyClasses}>

      <CheckBalanceModal visible={false} ref={ref}  content={props.modalContent} error={props.error} balance={props.balance} />
 
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
       
        <div className="Section__actions">
           <Button className="Section__cta" onClick={handleClick}>
            Check Your Balance
          </Button>
        </div>
       
      {props.children}
    </div>
  );
};

const SectionGiftCardBalance = ({
  params,
  media,
  content,
  className,
  children,
  modalData
}) => {
  hasMedia = params.add_media_column;

  let mobileAlignment = 'center';
  let desktopAlignment = 'around';

  const userData = useSelector(state => userDataSelector(state));
  let cardBalance = userData && userData.cardBalance && userData.cardBalance.balance ? userData.cardBalance.balance : 0;
  let error =  userData && userData.cardBalance && userData.cardBalance.status === "error" ? userData.cardBalance.message : false;
  // let data = pageData && pageData.acf_data && pageData.acf_data.components ? pageData.acf_data : false;
  
  console.log('error  ', error )

  if (!hasMedia) {
    mobileAlignment = content.position.mobile;
    desktopAlignment = content.position.desktop;
  }

  let rowClasses = classNames(
    'row',
    'align-items-center',
    `justify-content-${mobileAlignment}`,
    { 'justify-content-md-between': hasMedia },
    `justify-content-lg-${desktopAlignment}`,
  );

  let bgImage = params.background_image;
  let mobileBg = bgImage.mobile;
  let desktopBg = bgImage.desktop;

  return (
    <section
      className={classNames('Section', className, {
        '-bg-img': bgImage ? true : false,
      })}
      style={{
        color: params.text_color,
        backgroundColor: params.background_color,
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
          <SectionBody data={content} modalContent={modalData} error={error} balance={cardBalance}>{children}</SectionBody>
        </div>
      </div>
    </section>
  );
};

SectionGiftCardBalance.Media = SectionMedia;
SectionGiftCardBalance.Body = SectionBody;
SectionGiftCardBalance.defaultProps = {
  user:{
  auth:false,
  registered:false,
  user:false,
  rewards:false,
  coupons:false,
  deals:false,
  promotions:false,
  error:false,
  cardBalance:{
      balance: 0,
      card_number: false,
      status: false
    }
  }
}

export default SectionGiftCardBalance;
