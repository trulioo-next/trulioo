import React from "react";

import Button from "@/components/Button/Button";
import Social from "@/components/Social/Social";

import "./Subscribe.scss";

/**
 * TODO: Set dynamic IDs so component can be shared between homepage and footer.
 * TODO: Include <Social /> only if it's the footer.
 */

const Subscribe = props => (
  <form id="subscribe" className="subscribe">
    <div className="subscribe__field">
      <label for="subscribe-email" className="subscribe__label">
        Enter your e-mail address
      </label>
      <input
        id="subscribe-email"
        className="subscribe__input"
        type="email"
        placeholder="example@email.com"
      />
    </div>
    <div className="subscribe__field">
      <label
        for="subscribe-consent"
        className="subscribe__label subscribe__label--checkbox"
      >
        <input
          id="subscribe-consent"
          type="checkbox"
          className="subscribe__checkbox"
        />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      </label>
    </div>
    <div className="subscribe__footer">
      <Button type="submit">Sign Me Up</Button>
      <Social />
    </div>
  </form>
);

export default Subscribe;
