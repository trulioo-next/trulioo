import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { motion } from 'framer-motion';

import {
  Row,
  Col
} from 'reactstrap';

const MemberHeader = ({ info, onClick }) => {
  return (
    <div className="team-member-header text-center" onClick={ onClick }>
      <div className="team-member-photo">
        <img title={ info.full_name } alt={ info.full_name } src={ info.photo.url } />
      </div>
      <h3 className="h4 text-primary">{info.full_name}</h3>
      <span className="team-member-title">{info.title}</span>
    </div>
  );
};

const MemberCollapse = ({ info, i, expanded }) => {
  const isOpen = i === expanded;
  const collapseVariants = {
    opened: {
      opacity: 1,
      height: 'auto',
    },
    closed: {
      opacity: 0,
      height: 0,
    }
  };

  return isOpen ? (
    <motion.div
      key="collapse"
      className="team-member-collapse"
      initial="closed"
      animate="opened"
      exit="closed"
      variants={ collapseVariants }
    >
      <Row className="justify-content-center">
        <Col xs="12" lg="10">
          <div
            className='team-member-description text-md-center'
            dangerouslySetInnerHTML={ { __html: info.description } }
          />
        </Col>
      </Row>
    </motion.div>
  ) : null;
};

export const TeamMember = ({ i, className, children, expanded, ...props }) => {
  const isOpen = i === expanded;

  return (
    <div className={ classnames('team-member', { 'expanded': isOpen }, className) }>
      { children }
    </div>
  );
};

MemberHeader.propTypes = {
  info: PropTypes.object,
  onClick: PropTypes.function,
};

MemberCollapse.propTypes = {
  info: PropTypes.object,
  i: PropTypes.number,
  expanded: PropTypes.number,
};

TeamMember.propTypes = {
  i: PropTypes.number,
  className: PropTypes.string,
  expanded: PropTypes.number,
  children: PropTypes.node,
};

TeamMember.Header = MemberHeader;
TeamMember.Collapse = MemberCollapse;
