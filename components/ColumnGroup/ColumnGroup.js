import classNames from 'classnames';
import React from 'react';

import Video from '@/components/Video';
import Button from '@/components/Button';

import './ColumnGroup.scss';

const ColumnGroupItem = React.forwardRef(({ item, i, ...props }, ref) => {
  let classes = classNames('ColumnGroup__item', props.className);
  let componentType = item.as || 'div';
  let componentBody = 'div';

  /**
   * TODO: Need to figure out a way to pull Featured Image and Excerpt
   */

  let image = item.image;
  let title = item.title;
  let excerpt = item.excerpt;

  let columnMedia = (
    <img
      src={image.url}
      width={image.width}
      height={image.height}
      alt={image.alt}
    />
  );

  let ctaData = item.call_to_action;

  if (!item.as) {
    switch (item.type) {
      case 'post':
        componentType = 'article';
        ctaData = item.call_to_action
          ? item.call_to_action
          : {
              url: `/page/${item.post.post_name}`,
              title: 'Learn More',
              target: null,
            };
        title = item.title ? item.title : item.post.post_title;
        break;
      case 'video':
        componentType = 'figure';
        componentBody = 'figcaption';
        columnMedia = (
          <Video
            poster={image}
            video={item.video}
            className="ColumnGroup__video"
          />
        );
        break;
      default:
        componentType = 'div';
        break;
    }
  }

  const Component = componentType;
  const Body = componentBody;

  return (
    <Component className={classes} ref={ref} {...props}>
      <div className="ColumnGroup__media">{columnMedia}</div>
      <Body className="ColumnGroup__body">
        <div className="ColumnGroup__content">
          <h2 className="h3 ColumnGroup__title">{title}</h2>
          <div className="ColumnGroup__excerpt">{excerpt}</div>
        </div>
        <div className="ColumnGroup__actions">
          {ctaData && (
            <Button
              href={ctaData.url}
              as={ctaData.url}
              target={ctaData.target}
              className="ColumnGroup__button"
            >
              {ctaData.title}
            </Button>
          )}
        </div>
      </Body>
    </Component>
  );
});

ColumnGroupItem.displayName = ColumnGroupItem;

const ColumnGroup = props => {
  let columnGroupClasses = classNames('ColumnGroup', props.className);

  return <div className={columnGroupClasses}>{props.children}</div>;
};

ColumnGroup.Item = ColumnGroupItem;

export default ColumnGroup;
