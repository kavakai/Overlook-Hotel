class Bookings {
    constructor(booking) {
        this.id = booking.id || 0;
        this.userId = booking.userId || 0;
        this.date = booking.date || '';
        this.roomNumber = booking.roomNumber || 0;
        this.roomServiceCharges = booking.roomServiceCharges || [];
    }
}

export default Bookings