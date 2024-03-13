import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SeeReservations extends Component {
  state = {
    rooms: [],
    roomName: "",
    date: "",
    timeSlot: "",
    reservations: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchRooms();
  }

  fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:5000/rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();
      this.setState({ rooms: data });
    } catch (error) {
      console.error('Error fetching rooms:', error);
      this.setState({ error: 'Failed to fetch rooms' });
    }
  };

  fetchReservations = async () => {
    const { date, timeSlot, roomName } = this.state; // Use the correct state properties
  
    if (!date || !timeSlot || !roomName) {
      console.log("Date, time slot, or room not provided for fetching reservations.");
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      const url = `http://localhost:5000/rooms/reservations/${encodeURIComponent(roomName)}?date=${encodeURIComponent(date)}&timeSlot=${encodeURIComponent(timeSlot)}`;
      console.log("Fetching reservations from:", url);
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Reservations data:", data);
  
      this.setState({ reservations: data.reservations, isLoading: false });
    } catch (error) {
      console.error('Error fetching reservations:', error);
      this.setState({ error: 'Failed to fetch reservations', isLoading: false });
    }
  };
  


  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchReservations();
  };

  render() {
    const { rooms, roomName, date, timeSlot, reservations, isLoading, error } = this.state;
  
    return (
      <div>
        <h2>Reservations</h2>
        <Link to="/general" className="back-button">Back</Link>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="roomName">Room Name:</label>
            <select id="roomName" name="roomName" value={roomName} onChange={this.handleInputChange}>
              <option value="">Select a room</option>
              {rooms.map(room => (
                <option key={room._id} value={room.name}>{room.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={date} onChange={this.handleInputChange} />
          </div>
          <div>
            <label htmlFor="timeSlot">Time Slot:</label>
            <select id="timeSlot" name="timeSlot" value={timeSlot} onChange={this.handleInputChange}>
              <option value="">Select a time slot</option>
              <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
              <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
              <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
            </select>
          </div>
          <button type="submit">Fetch Reservations</button>
        </form>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : reservations.length > 0 ? (
          <div>
            <h3>Reservation Details:</h3>
            <ul>
              {reservations.map((reservation, index) => (
                <li key={index}>
                  <strong>Computer ID:</strong> {reservation.computerId}, <strong>Date:</strong> {reservation.date}, <strong>Time Slot:</strong> {reservation.timeSlot}, <strong>User ID:</strong> {reservation.userId}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
  
}

