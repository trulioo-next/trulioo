import React from 'react';
import Link from 'next/link';

import LocationIcon from '@/static/images/location.svg';
import AccountIcon from '@/static/images/account.svg';
import SearchIcon from '@/static/images/search.svg';

const Toolbar = () => (
  <ul className="Toolbar">
    <li className="SiteHeader__item">
      <Link href="/store-locator" as="/store-locator">
        <a className="SiteHeader__link">
          <span className="Toolbar__icon">
            <LocationIcon />
          </span>
          <span className="Toolbar__label">Find A Store</span>
        </a>
      </Link>
    </li>
    <li className="SiteHeader__item">
      <Link href="/7rewards" as="/7rewards">
        <a className="SiteHeader__link">
          <span className="Toolbar__icon">
            <AccountIcon />
          </span>
          <span className="Toolbar__label">Account</span>
        </a>
      </Link>
    </li>
    <li className="SiteHeader__item -search">
      <button role="tab" className="SiteHeader__toggle -search">
        <span className="Toolbar__icon">
          <SearchIcon />
        </span>
      </button>
      <div className="Search__collapse"></div>
    </li>
  </ul>
);

export default Toolbar;
