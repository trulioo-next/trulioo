import React from 'react';
import { motion } from 'framer-motion';

import UberEatsLogo from '@/static/images/uber-eats.svg';
import FoodoraLogo from '@/static/images/foodora.svg';

const DeliveryOption = props => {
  const optionVariants = {
    shown: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div className="col col-6" variants={optionVariants}>
      <a
        className={`Delivery__option`}
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={props.image.url}
          width={props.image.width}
          height={props.image.height}
          alt={props.image.alt}
        />
        <div className="Delivery__optionOverlay">
          {props.deliveryService === 'UberEats' ? (
            <UberEatsLogo className="Delivery__optionLogo" />
          ) : (
            <FoodoraLogo className="Delivery__optionLogo" />
          )}
          <span className="Delivery__optionLabel">See Menu &rsaquo;</span>
        </div>
      </a>
    </motion.div>
  );
};

export default DeliveryOption;
