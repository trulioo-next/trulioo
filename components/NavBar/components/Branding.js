import React from 'react';
import Link from 'next/link';

import Logo from '@/static/assets/heart.svg';

const Branding = () => (
  <Link href="/" as="/">
    <a className="SiteHeader__logo">
      <Logo />
    </a>
  </Link>
);

export default Branding;