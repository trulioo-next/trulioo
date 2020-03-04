import React from 'react';
import Link from 'next/link';

import './NavBar.scss';
import Branding from './components/Branding';
import DesktopNav from './components/DesktopNav';
import OffCanvasNav from './components/OffCanvasNav';
import Toolbar from './components/Toolbar';

const NavBar = (data) => (
  <nav className="SiteHeader">
    <Branding />

    <DesktopNav data={data} />
    <OffCanvasNav />

    <Toolbar />
  </nav>
);
export default NavBar;
