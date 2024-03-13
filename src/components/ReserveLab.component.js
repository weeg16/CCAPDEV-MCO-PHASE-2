import React, { Component } from 'react';

export default class ReserveLab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      computerId: '1',
      date: '',
      timeSlot: '',
      availableTimeSlots: [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 1:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM',
        '4:00 PM - 5:00 PM',
      ],
      submitting: false,
      message: '',
      seatingArrangement: new Array(25).fill(false),
    };
  }

  handleSeatClick = (computerId) => {
    this.setState({ 
      computerId, 
      timeSlot: '', // Reset time slot when a new seat is clicked
    });
  };

  handleTimeSlotClick = (timeSlot) => {
    this.setState({ timeSlot });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitting: true });
  
    try {
      // Check if the selected date is in the past
      const currentDate = new Date();
      const selectedDate = new Date(this.state.date);

      console.log('Current Date:', currentDate);
      console.log('Selected Date:', selectedDate);
      if (selectedDate < currentDate) {
        this.setState({ message: 'You cannot reserve for a past date.' });
        return;
      }
  
      // Check if the selected date is a weekend (Saturday or Sunday)
      if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
        this.setState({ message: 'Reservations are not allowed on weekends.' });
        return;
      }
  
      // Check if the user already has a reservation for the selected date
      const existingReservationsResponse = await fetch(`http://localhost:5000/rooms/reservations?date=${this.state.date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const existingReservations = await existingReservationsResponse.json();
  
      // Check if the user already has a reservation for the selected date
      const userId = localStorage.getItem('username');
      const userExistingReservation = existingReservations.find(reservation => reservation.userId === userId);
      if (userExistingReservation) {
        this.setState({ message: 'You already have a reservation for this date.' });
        return;
      }
  
      // If user doesn't have a reservation for the selected date, proceed with making a reservation
      const response = await fetch('http://localhost:5000/rooms/reservelab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: this.state.roomName,
          computerId: this.state.computerId,
          date: this.state.date,
          timeSlot: this.state.timeSlot,
          userId: userId,
        }),
      });
      const data = await response.json();
      this.setState({ message: data.message });
  
      if (data.message === 'Reservation successful') {
        const updatedSeating = [...this.state.seatingArrangement];
        updatedSeating[this.state.computerId - 1] = true; // Reserve the seat
        this.setState({ seatingArrangement: updatedSeating });
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      this.setState({ message: 'Failed to make reservation' });
    } finally {
      this.setState({ submitting: false });
    }
  };
  

  renderTimeSlots = () => {
    const { availableTimeSlots, computerId } = this.state;
    if (!computerId) return null; // Only show time slots if a seat is selected

    return (
      <div className="time-slots">
        {availableTimeSlots.map((timeSlot, index) => (
          <button
            key={index}
            className="time-slot"
            onClick={() => this.handleTimeSlotClick(timeSlot)}
          >
            {timeSlot}
          </button>
        ))}
      </div>
    );
  };

  render() {
    const { roomName, date, timeSlot, submitting, message } = this.state;
  
    // Get today's date
    const today = new Date();
  
    // Check if the selected date is a weekend (Saturday or Sunday)
    const selectedDate = new Date(date);
    const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
  
    // Check if the selected date is in the past
    const isPastDate = selectedDate < today;
  
    const roomNames = ['L320', 'L335', 'G304B', 'G306', 'G404', 'Y603', 'V211', 'V301', 'J213'];

  
    return (
      <div className="reserve-computer-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            Date:
            <input type="date" value={date} min={today.toISOString().split('T')[0]} onChange={(e) => this.setState({ date: e.target.value })} />
          </label>
          <label>
            Time Slot:
            <input 
              type="text" 
              value={timeSlot} 
              readOnly // This makes the input read-only
            />
          </label>
          <button type="submit" disabled={submitting || isWeekend || isPastDate}>Reserve</button>
        </form>
        {submitting && <p>Submitting reservation...</p>}
        {isWeekend && <p>Reservations are not allowed on weekends.</p>}
        {isPastDate && <p>Please select a future date.</p>}
        {message && <p>{message}</p>}
          {this.renderTimeSlots()}
      </div>
    );
  }  
}
