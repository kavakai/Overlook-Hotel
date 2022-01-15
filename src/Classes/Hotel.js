import domUpdates from "../domUpdates";

class Hotel {
    constructor(rooms, bookings, user) {
        this.rooms = rooms.flat(1);
        this.bookings = bookings.flat(1);
        this.availableRooms = [];
        this.user = user;
    };

    getAvailableRooms(date) {
        let currentBookings = this.bookings.filter(booking => {
            let requestedDate = date.split('-').join('')
            let bookingDate = booking.date.split('/').join('');
            return requestedDate === bookingDate
        });
        let available = this.rooms.filter(room => {
            const num = currentBookings.map(book => book.roomNumber)
            return !num.includes(room.number)
        });
        this.availableRooms.push(available);
    };
};

export default Hotel