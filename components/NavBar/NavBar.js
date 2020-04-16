import React from 'react';

import './NavBar.scss';
import Branding from './components/Branding';
import DesktopNav from './components/DesktopNav';
import OffCanvasNav from './components/OffCanvasNav';

const NavBar = data => (
  <nav className="SiteHeader">
    <Branding />
    <OffCanvasNav data={data} />
    <DesktopNav data={data}  />
  </nav>
);
export default NavBar;
