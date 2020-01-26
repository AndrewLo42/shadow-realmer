import React from 'react';

function ShadowRealmerIcon(props) {
  return (
    <img src="/images/shadowrealmer.png" alt="icon" className="icon-image" onClick={() => props.toggleSidebar()}/>
  );
}

export default ShadowRealmerIcon;
