import React from "react";
import Link from "next/link";

import Subscribe from "@/components/Subscribe/Subscribe";

import "./Footer.scss";

const links = [
  { href: "/about", as: "/about", label: "About" },
  { href: "/contact", as: "/contact", label: "Contact" }
].map(link => {
  link.key = `nav-link-${link.as}-${link.label}`;
  return link;
});

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__primary">
      <div className="site-footer__wrapper">
        <div className="site-footer__col site-footer__col--form">
          <h2 className="site-footer__heading">Online Community</h2>
          <Subscribe />
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">7Rewards</h2>
          <ul className="site-footer__links">
            {links.map(({ key, href, as, label }) => (
              <li key={key} className="site-footer__item">
                <Link href={href} as={as}>
                  <a className="site-footer__link">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Find a Store</h2>
          <ul className="site-footer__links">
            {links.map(({ key, href, as, label }) => (
              <li key={key} className="site-footer__item">
                <Link href={href} as={as}>
                  <a className="site-footer__link">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Services</h2>
          <ul className="site-footer__links">
            {links.map(({ key, href, as, label }) => (
              <li key={key} className="site-footer__item">
                <Link href={href} as={as}>
                  <a className="site-footer__link">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h2 className="site-footer__heading">Our Brand</h2>
          <ul className="site-footer__links">
            {links.map(({ key, href, as, label }) => (
              <li key={key} className="site-footer__item">
                <Link href={href} as={as}>
                  <a className="site-footer__link">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="site-footer__secondary">
      <div className="site-footer__wrapper">
        <span className="site-footer__copyright">
          Copyright 7-Eleven Canada Inc. 2020 All rights reserved
        </span>
        <a className="site-footer__sitemap" href="#">
          sitemap
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
