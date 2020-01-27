import React from 'react';

function ShadowRealmerIcon(props) {
  return (
    <img src="/images/shadowrealmer.png" alt="icon" className="icon-image" onClick={() => props.history.push('/')}/>
  );
}

export default ShadowRealmerIcon;
