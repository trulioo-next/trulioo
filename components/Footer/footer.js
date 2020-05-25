import React from 'react';
import { Navigation } from './navigation';
import { SubNavigation } from './subnavigation';
import { Tnc } from './tnc';

export const Footer = () => (
  <div className='section fp-auto-height footer'>
    <footer className="container">
      <SubNavigation />
      <Navigation />
      <Tnc />
    </footer>
  </div>
);
