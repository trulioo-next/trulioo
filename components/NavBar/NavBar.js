import React from 'react';
import Link from 'next/link';

import './NavBar.scss';
import Branding from './components/Branding';
import DesktopNav from './components/DesktopNav';
import OffCanvasNav from './components/OffCanvasNav';
import Toolbar from './components/Toolbar';

const NavBar = () => (
  <nav className="SiteHeader">
    <Branding />

    <DesktopNav />
    <OffCanvasNav />

    <Toolbar />
  </nav>
);
export default NavBar;
