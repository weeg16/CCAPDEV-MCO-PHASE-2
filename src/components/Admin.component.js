import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            error: null,
            showUserList: false
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const users = await response.json();
            this.setState({ users, loading: false });
        } catch (error) {
            console.error('Error fetching users:', error);
            this.setState({ error: 'Error fetching users', loading: false });
        }
    };

    handleViewUserDetails = () => {
        this.setState({ showUserList: true });
    };

    render() {
        const { users, loading, error, showUserList } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        const filteredUsers = users.filter(user => user.username !== '00000000');

        return (
            <div>
                <h2>Admin Panel</h2>
                <Link to ="/admin" className="admin-panel" onClick={this.handleViewUserDetails}>
                    View User Details
                </Link>
                {showUserList && (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
