import React from 'react';

export default function SecretPage(props) {
  return (
    <>
      <div className="title">{"You've Been Banished To"}</div>
      <div className="secret-page" onClick={() => props.history.push('/')}></div>
      <div className="title">{'The Shadow Realm'}</div>
    </>
  );
}
