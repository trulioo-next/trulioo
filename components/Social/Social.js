import React from "react";

import YouTubeIcon from "@/static/images/youtube.svg";
import InstagramIcon from "@/static/images/instagram.svg";
import TwitterIcon from "@/static/images/twitter.svg";
import FacebookIcon from "@/static/images/facebook.svg";
import LinkedInIcon from "@/static/images/linkedin.svg";

import "./Social.scss";

const Social = () => (
  <ul className="social">
    <li className="social__item">
      <a className="social__link" href="https://youtube.com/" target="_blank">
        <YouTubeIcon />
      </a>
    </li>
    <li className="social__item">
      <a className="social__link" href="https://instagram.com/" target="_blank">
        <InstagramIcon />
      </a>
    </li>
    <li className="social__item">
      <a className="social__link" href="https://twitter.com/" target="_blank">
        <TwitterIcon />
      </a>
    </li>
    <li className="social__item">
      <a className="social__link" href="https://facebook.com/" target="_blank">
        <FacebookIcon />
      </a>
    </li>
    <li className="social__item">
      <a className="social__link" href="https://linkedin.com/" target="_blank">
        <LinkedInIcon />
      </a>
    </li>
  </ul>
);

export default Social;
