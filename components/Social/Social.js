import React from 'react';

import YouTubeIcon from '@/static/images/youtube.svg';
import InstagramIcon from '@/static/images/instagram.svg';
import TwitterIcon from '@/static/images/twitter.svg';
import FacebookIcon from '@/static/images/facebook.svg';
import LinkedInIcon from '@/static/images/linkedin.svg';

import './Social.scss';

const Social = () => (
  <ul className="Social">
    <li className="Social__item">
      <a
        className="Social__link"
        href="https://www.youtube.com/channel/UCLIHZgJhWZw1F7NdWq8yZmA"
        target="_blank"
        rel="noopener noreferrer"
        target="_blank"
      >
        <YouTubeIcon />
      </a>
    </li>
    <li className="Social__item">
      <a
        className="Social__link"
        href="https://www.instagram.com/7elevencanada/"
        target="_blank"
        rel="noopener noreferrer"
        target="_blank"
      >
        <InstagramIcon />
      </a>
    </li>
    <li className="Social__item">
      <a
        className="Social__link"
        href="https://twitter.com/7ElevenCanada"
        target="_blank"
        rel="noopener noreferrer"
        target="_blank"
      >
        <TwitterIcon />
      </a>
    </li>
    <li className="Social__item">
      <a
        className="Social__link"
        href="https://www.facebook.com/7ElevenCanada"
        target="_blank"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FacebookIcon />
      </a>
    </li>
    <li className="Social__item">
      <a
        className="Social__link"
        href="https://www.linkedin.com/company/7-eleven-canada-inc./"
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkedInIcon />
      </a>
    </li>
  </ul>
);

export default Social;
