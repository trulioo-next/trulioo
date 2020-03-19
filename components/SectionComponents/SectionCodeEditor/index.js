import React, { useEffect, useState } from 'react';

const SectionCodeEditor = props => {
  // console.log('SectionCodeEditor  PROPS :: ', props )

  return (
    <section
      className="Section"
      dangerouslySetInnerHTML={{ __html: props.wysiwyg }}
    ></section>
  );
};

SectionCodeEditor.defaultProps = {};

export default SectionCodeEditor;
