import React from 'react';

import Button from '@/components/Button/Button';
import Social from '@/components/Social/Social';

import './Subscribe.scss';

/**
 * TODO: Set dynamic IDs so component can be shared between homepage and footer.
 * TODO: Include <Social /> only if it's the footer.
 */

const Subscribe = props => (
  <form id="subscribe" className="Subscribe">
    <div className="col col-12">
      <label htmlFor="subscribe-email" className="Subscribe__label">
        Enter your e-mail address
      </label>
    </div>
    <div className="Subscribe__field">
      <input
        id="subscribe-email"
        className="Subscribe__input"
        type="email"
        placeholder="example@email.com"
      />
    </div>
    <div className="Subscribe__field">
      <label htmlFor="subscribe-consent" className="Subscribe__label -checkbox">
        <input
          id="subscribe-consent"
          type="checkbox"
          className="Subscribe__checkbox"
        />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      </label>
    </div>
    <div className="Subscribe__footer">
      <Button type="submit">Sign Me Up</Button>
      <Social />
    </div>
  </form>
);

export default Subscribe;
