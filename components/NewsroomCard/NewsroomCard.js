import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';

import Card from 'react-bootstrap/Card';

import './NewsroomCard.scss';

const NewsroomCard = props => {
  const { item: post, href, isFeature, isMorePosts } = props;

  let addWhitespace = true;
  if (post.summary.search(/\<p.*?\>.*\<\/p\>/gi) > -1)
  { // --- Don't add whitespace if content has <p> tags
    addWhitespace = false;
  }

  let cardClasses = classNames('Card', '-newsroom', {'isFeature': isFeature}, {'isMorePosts': isMorePosts});
  let bodyClasses = classNames('Card__body', 'text-left');

  return (
    <Card className={cardClasses}>
        {!isFeature &&
          <Link href="/newsroom/[slug]" as={href}><a>
            <Card.Body className={bodyClasses}>
              { post.featureImage && 
              <div className="Card__image -cover -square">
                <img src={post.featureImage.url} />
              </div>
              }
              <div className="Card__publishDate">{post.publishDate}</div>
              <h3 className={classNames('h4', 'Card__title')}>{post.title}</h3>
            </Card.Body>
          </a></Link>
        }
        {isFeature &&
            <Card.Body className={bodyClasses}>
            { post.featureImage && 
            <div className="Card__image -cover -square">
              <img src={post.featureImage.url} />
            </div>
            }
            <div className="content">
              <h3 className={classNames('h4', 'Card__title')}>{post.title}</h3>
              <div className="Card__publishDate">{post.publishDate}</div>
              <div className={classNames('Card__content', {'addWhitespace': addWhitespace})}>
                <p>{post.summary}</p>
              </div>
              <Link href="/newsroom/[slug]" as={href}><a className="Button">Read More</a></Link>
            </div>
          </Card.Body>
        }
    </Card>
  );
};

export default NewsroomCard;
