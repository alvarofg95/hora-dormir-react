import React from 'react';

export default ({ src, alt, width, className }) => (
  <img src={src} alt={alt} width={width} className={className} title={alt} />
);
