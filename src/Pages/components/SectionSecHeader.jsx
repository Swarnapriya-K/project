import React from 'react'

function SectionSecHeader({title,subtitle}) {
  return (
    <div>
      <h3 className="sec2-text1">{subtitle}</h3>
      <h1 className="sec2-text2">{title}</h1>
    </div>
  );
}

export default SectionSecHeader