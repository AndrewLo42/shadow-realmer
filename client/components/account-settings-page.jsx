import React from 'react';

export default function AccountSettings(props) {
  return (
    <>
      <div className="account-page-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
      </div>
      <div className="title">Settings</div>
      <div className="account-page-main">
        <select name="mainGame" className="input long-input">
          <option value="null">Change Main Game</option>
          <option value="1">Magic the Gathering</option>
          <option value="2">Yu-Gi-Oh</option>
        </select>
        <input type="text" className="input long-input" placeholder="Change Deck Archetype" />
        <input type="text" className="input long-input" placeholder="Change Password" />
        <input type="text" className="input long-input" placeholder="Confirm Password" />
        <button className="input long-input confirm">Confirm</button>
        <form action="https://media1.tenor.com/images/fb776106e34814dd62ce24a7442ce7b6/tenor.gif?itemid=5159766">
          <button className="input long-input cancel" type="submit">Secret</button>
        </form>
      </div>
    </>
  );
}
