import React from 'react';
import Link from 'next/link';

import Subscribe from '@/components/Subscribe';

import './Footer.scss';
import linkData from './placeholder-links.json';

const links = linkData.map(link => {
  link.key = `nav-link-${link.as}-${link.label}`;
  return link;
});

const NavList = props => {
  let navIndex = props.i;
  return (
    <ul className="SiteFooter__links">
      {props.items.map(({ href, as, label }, index) => (
        <li
          key={`footer-nav-${navIndex}-item-${index}`}
          className="SiteFooter__item"
        >
          <Link href={href} as={as}>
            <a className="SiteFooter__link">{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Footer = () => (
  <footer className="SiteFooter">
    <div className="SiteFooter__section -primary">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col col-12 col-lg-4 order-lg-last">
            <h2 className="SiteFooter__heading h4">Online Community</h2>
            <Subscribe prefix="SiteFooter" social />
          </div>
          <div className="col col-lg-7">
            <div className="row">
              {links.map(({ href, as, label, subnav }, i) => (
                <div key={`footer-item-${i}`} className="col">
                  <h2 className="SiteFooter__heading h4">{label}</h2>
                  {subnav && <NavList items={subnav} i={i} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="SiteFooter__section -secondary">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col col-auto">
            <span className="SiteFooter__copyright">
              Copyright 7-Eleven Canada Inc. 2020 All rights reserved
            </span>
          </div>
          <div className="col col-auto">
            <Link href="/sitemap" as="/sitemap">
              <a className="SiteFooter__link">sitemap</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
