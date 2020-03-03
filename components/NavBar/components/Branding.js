import React from 'react';
import Link from 'next/link';

import Logo from '@/static/images/7-eleven.svg';

const Branding = () => (
  <Link href="/">
    <a className="SiteHeader__logo">
      <Logo />
    </a>
  </Link>
);

export default Branding;
