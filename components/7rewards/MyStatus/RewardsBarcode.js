import React, { useEffect } from 'react';
import bwipjs from 'bwip-js';

const RewardsBarcode = ({ data }) => {
  useEffect(() => {
    bwipjs.toCanvas('user-barcode', {
      bcid: 'pdf417',
      text: data,
      scale: 4,
      includetext: false,
      height: 10,
    });
  });

  return <canvas id="user-barcode" className="w-100" />;
};

export default RewardsBarcode;
