import React, { Component } from 'react';

export default class ReserveComputer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '', // Keep track of the selected room name
      computerId: '',
      date: '',
      timeSlot: '',
      submitting: false,
      message: ''
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitting: true });

    try {
      const response = await fetch('http://localhost:5000/rooms/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: this.state.roomName,
          computerId: this.state.computerId,
          date: this.state.date,
          timeSlot: this.state.timeSlot,
        }),
      });
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error making reservation:', error);
      this.setState({ message: 'Failed to make reservation' });
    } finally {
      this.setState({ submitting: false });
    }
  };

  render() {
    const { roomName, computerId, date, timeSlot, submitting, message } = this.state;

    const roomNames = ['LS212', 'LS229', 'G302', 'G304A', 'Y602', 'V103', 'J212'];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Room Name:
            <select value={roomName} onChange={(e) => this.setState({ roomName: e.target.value })}>
              <option value="">Select a room</option>
              {roomNames.map((room, index) => (
                <option key={index} value={room}>{room}</option>
              ))}
            </select>
          </label>
          <label>
            Computer ID:
            <input type="number" value={computerId} onChange={(e) => this.setState({ computerId: e.target.value })} />
          </label>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => this.setState({ date: e.target.value })} />
          </label>
          <label>
            Time Slot:
            <input type="text" value={timeSlot} onChange={(e) => this.setState({ timeSlot: e.target.value })} />
          </label>
          <button type="submit" disabled={submitting}>Reserve</button>
        </form>
        {submitting && <p>Submitting reservation...</p>}
        {message && <p>{message}</p>}
      </div>
    );
  }
}
