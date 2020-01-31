import React from 'react';

export default function SignOutPage(props) {
  return (
    <div className="sign-out-page">
      <h2>{"You've Been Banished To"}</h2>
      <img src="/images/kaiba.gif" alt="signed out" className="sign-out-image" onClick={() => props.history.push('/')} />
      <h2>{'The Shadow Realm'}</h2>
    </div>
  );
}
