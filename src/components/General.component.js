// General.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class General extends Component {
  componentDidMount() {
    this.handleWindowClick = this.handleWindowClick.bind(this);
    window.addEventListener('click', this.handleWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleWindowClick);
  }

  handleSettingsButtonClick() {
    const dropdownContent = document.querySelector('.dropdown-content');
    const isDisplayed = dropdownContent.style.display === 'block';
    dropdownContent.style.display = isDisplayed ? 'none' : 'block';
  }

  handleWindowClick(event) {
    const settingsButton = document.querySelector('.settings-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (!settingsButton.contains(event.target) && !dropdownContent.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  }

  render() {
    return (
      <div className="container">
        <Link to ="/reserve" className="general-button">Reserve</Link>
        <Link to ="/edit-reservation" className="general-button">Edit Reservation</Link>
        <Link to ="/see-reservations" className="general-button">See Reservations</Link>

        <div className="dropdown">
          <button className="settings-button button" onClick={this.handleSettingsButtonClick}>
            Settings
          </button>
          <div className="dropdown-content">
            <a href="profile.html">View profile</a>
            <a href="login.html">Log out</a>
          </div>
        </div>
      </div>
    );
  }
}
