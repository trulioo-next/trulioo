import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

import './SlurpeeSpacer.scss';

const SlurpeeSpacer = () => {
  return (
    <div className="Section SlurpeeSpacer">
      <motion.img
        src="/static/images/slurpee/slurpee-logo.png"
        className="SlurpeeSpacer__branding"
      />
      <div className="SlurpeeSpacer__elements">
        <motion.img
          className="SlurpeeSpacer__slurpee -Furthest"
          src="/static/images/slurpee/slurpee.png"
          initial={{ rotate: '-17.5deg' }}
        />
        <motion.img
          className="SlurpeeSpacer__slurpee -Foreground"
          src="/static/images/slurpee/slurpee.png"
          initial={{ rotate: '-5deg' }}
        />
        <motion.img
          className="SlurpeeSpacer__slurpee -Middleground"
          src="/static/images/slurpee/slurpee.png"
          initial={{ rotate: '7.5deg' }}
        />
      </div>
    </div>
  );
};

export default SlurpeeSpacer;
