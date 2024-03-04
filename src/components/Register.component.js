import React from 'react';
import { Link } from 'react-router-dom';

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, username, password, confirmPassword } = this.state;

    // Validation
    if (username.length !== 8 || isNaN(username)) {
      alert('Username must be an 8-digit number.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Assuming you're using some kind of backend for user registration,
    // you would typically send this data to your backend to handle registration.
    // For demonstration purpose, I'm storing it in local storage.
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect to '/'
    this.props.history.push('/');
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <div className="left-panel">
          <div className="register-title">Register</div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="First name"
              className="input-field"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="input-field"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
              pattern="\d{8}"
              title="Username should be 8 digits"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="input-field"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              required
            />
            <button type="submit" className="register-button">Sign up</button>
          </form>
          <Link to="/" className="back-button">Back</Link> {/* Back button with routing */}
        </div>
        <div className="right-panel">
          <img src="dlsu logo.png" alt="DLSU Logo" className="logo" />
          <img src="dlsu lab reservation title.png" alt="DLSU Lab Room Reservation" className="icon-text" />
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
