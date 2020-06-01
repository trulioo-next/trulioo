import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AnimatePresence } from 'framer-motion';

import { TeamMember } from './team-member';

export const TeamGrid = ({ items }) => {
  const [ expanded, setExpanded ] = useState();

  return (
    <AnimatePresence exitBeforeEnter>
      <ul className="team-members">
        { items && items.map((item, index) =>
          (
            <li key={ index }>
              <TeamMember i={ index } expanded={ expanded }>
                <TeamMember.Header i={ index } info={ item } onClick={ () => setExpanded( index === expanded ? false : index) } />
                <TeamMember.Collapse  i={ index } info={ item } expanded={ expanded } />
              </TeamMember>
            </li>
          )
        )}
      </ul>
    </AnimatePresence>
  );
};

TeamGrid.propTypes = {
  items: PropTypes.array,
};
