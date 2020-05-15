import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Social from '@/components/Social';

import './Footer.scss';

import { selectFooterData } from '@/stores/app/selectors';

const NavList = props => {
  let row = '';
  if (props.items) {
    row = props.items.map(({ href, label }, key) => {
      let externalPath = href.split('://');
        
      let isDynamic =
        label === 'Sign-In / Join Now' || 
        label === 'My Account' ||
        label === 'Promos & Contests' || 
        label === 'Gift Cards' || 
        label === 'Terms and Conditions' || 
        label === 'Contact Us' || 
        label === 'Privacy'
        ? false
        : true
      
      // console.log('label:: ', label, isDynamic)

      if (externalPath[0] === 'https' || externalPath[0] === 'http') {
        return (
          <li key={key} className="SiteFooter__item">
            <a
              className="SiteFooter__link"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          </li>
        );
      }
      if(isDynamic) {
        return ( <li key={key} className="SiteFooter__item">
          <Link href="/[page]" as={href} replace={true}>
            <a className="SiteFooter__link">{label}</a>
          </Link>
        </li>)
      }
      if(!isDynamic) {
      return (
        <li key={key} className="SiteFooter__item">
          <Link href={href} replace={true}>
            <a className="SiteFooter__link">{label}</a>
          </Link>
        </li>
      );
      }
    });
  }

  return <ul className="SiteFooter__links">{row}</ul>;
};

const Footer = () => {
  let footerData = useSelector(state => selectFooterData(state));

  let LINKS = false;
  if (footerData) {
    let footers = [
      'footer1',
      'footer2',
      'footer3',
      'footer4',
      'footer5',
      'footer6',
      'footer7',
      'footer8',
      'footerUpper',
    ];
    LINKS = [];
    for (var i = 0; i < footerData.length; i++) {
      if (i < 4 && footerData[i][footers[i]]) {
        // console.log('FOOTER BLOCK ', footerData[i][footers[i]] )
        let children = [];
        if (footerData[i][footers[i]][0].children.length > 0) {
          let pp = footerData[i][footers[i]][0].children;
          for (var ii = 0; ii < pp.length; ii++) {
            children.push({
              href: pp[ii].url,
              as: pp[ii].url,
              label: pp[ii].name,
            });
          }
        }
        LINKS.push({
          href: footerData[i][footers[i]][0].url,
          label: footerData[i][footers[i]][0].name,
          subnav: children,
        });
      }
    }
  }

  // console.log('FOOTER DATA ', footerData )

  return (
    <footer className="SiteFooter">
      <div className="SiteFooter__section -primary">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col">
              <div className="row">
                {LINKS &&
                  LINKS.map(({ label, subnav }, i) => (
                    <div key={i} className="col">
                      <h2 className="SiteFooter__heading h4">{label}</h2>
                      {subnav && <NavList items={subnav} i={i} />}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Social />
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
};

export default Footer;
