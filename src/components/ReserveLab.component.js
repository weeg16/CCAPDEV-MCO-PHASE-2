import React, { Component } from 'react';

export default class ReserveLab extends Component {
    state = {
        selectedDate: '',
        selectedTimeSlot: '',
        selectedLab: '',
    };

    labs = [
        'ST LASALLE L320',
        'ST LASALLE L335',
        'GOKONGWEI G304B',
        'GOKONGWEI G306',
        'GOKONGWEI G404',
        'YUCHENGCO Y603',
        'VELASCO V211',
        'VELASCO V301',
        'ST JOSEPH J213',
    ];

    timeSlots = [
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00',
    ];

    handleDateChange = (event) => {
        this.setState({ selectedDate: event.target.value });
    };

    handleTimeSlotChange = (event) => {
        this.setState({ selectedTimeSlot: event.target.value });
    };

    handleLabSelection = (event) => {
        this.setState({ selectedLab: event.target.value });
    };

    confirmReservation = async () => {
        const apiUrl = 'http://localhost:5000/api/reservations/add';
        const { selectedLab, selectedDate, selectedTimeSlot } = this.state;

        // Check if all fields are selected
        if (!selectedLab || !selectedDate || !selectedTimeSlot) {
            alert('Please select lab, date, and time slot');
            return;
        }

        const reservationDetails = {
            lab: selectedLab,
            date: selectedDate,
            timeSlot: selectedTimeSlot,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to make the reservation');
            }

            const data = await response.json();
            alert(`Reservation confirmed: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error making reservation:', error);
            alert('Error making reservation. Please try again.');
        }
    };

    render() {
        return (
            <div>
                <h2>Reserve Lab</h2>
                <div>
                    <label>Date:</label>
                    <input type="date" value={this.state.selectedDate} onChange={this.handleDateChange} />
                </div>
                <div>
                    <label>Time Slot:</label>
                    <select value={this.state.selectedTimeSlot} onChange={this.handleTimeSlotChange}>
                        {this.timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Lab:</label>
                    <select value={this.state.selectedLab} onChange={this.handleLabSelection}>
                        {this.labs.map((lab, index) => (
                            <option key={index} value={lab}>{lab}</option>
                        ))}
                    </select>
                </div>
                <button onClick={this.confirmReservation}>Confirm Reservation</button>
            </div>
        );
    }
}
