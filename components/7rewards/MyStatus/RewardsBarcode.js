import React, { useEffect } from 'react';
import base64 from 'base-64';
import bwipjs from 'bwip-js';

const RewardsBarcode = ({ data }) => {
  useEffect(() => {
    bwipjs.toCanvas('user-barcode', {
      bcid: 'pdf417',
      text: base64.decode(data),
      scale: 4,
      includetext: true,
      textxalign: 'center',
      height: 10,
      padding: 0,
    });
  });

  return <canvas id="user-barcode" className="w-100" />;
};

export default RewardsBarcode;
