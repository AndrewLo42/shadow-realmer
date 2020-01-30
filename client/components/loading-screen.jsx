import React from 'react';

export default function LoadingScreen(props) {
  return (
    <div className="loading-screen">
      <img src="/images/loading.gif" alt="loading-icon" className="loading-animation"/>
      <h1 className="title">Loading...</h1>
    </div>
  );
}
