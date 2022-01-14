import domUpdates from "../domUpdates";

class Hotel {
    constructor(rooms, bookings) {
        this.rooms = rooms;
        this.bookings = bookings;
    };

    checkAvailability(dates) {
        this.bookings.forEach(booking => {
            let bookingDate = new Date(booking.date);
            let requestedDate = new Date(dates);
            bookingDate === requestedDate ? domUpdates.confirmBooking() : domUpdates.rejectBooking()
        })
    };
};

export default Hotel