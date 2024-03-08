import React, { Component } from 'react';

export default class Profile extends Component {
    state = {
        user: {},
        isLoading: true,
        error: null
    };

    componentDidMount() {
        const username = localStorage.getItem('username');
        
        if (!username) {
            this.setState({ isLoading: false, error: 'Username not found in localStorage' });
            return;
        }
        
        fetch(`http://localhost:5000/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ user: data, isLoading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, isLoading: false });
            });
    }

    render() {
        const { user, isLoading, error } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className="profile-container">
                <h1 className="profile-title">User Profile</h1>
                <div className="profile-details">
                    {/* Display user details */}
                    <p>Username: {user.username}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                </div>
            </div>
        );
    }
}
