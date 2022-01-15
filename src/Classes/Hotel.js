import domUpdates from "../domUpdates";

class Hotel {
    constructor(rooms, bookings, user) {
        this.rooms = rooms || [];
        this.bookings = bookings || [];
        this.availableRooms = [];
        this.user = user || '';
    };

    getAvailableRooms(date) {
        this.availableRooms = [];
        const currentBookings = this.bookings.flat(1).filter(booking => {
            let requestedDate = date.split('-').join('')
            let bookingDate = booking.date.split('/').join('');
            return requestedDate === bookingDate
        });
        const available = this.rooms.flat(1).filter(room => {
            const num = currentBookings.map(book => book.roomNumber)
            return !num.includes(room.number)
        });
        this.availableRooms.push(available);
        domUpdates.displayAvailableRooms(this.availableRooms.flat(1))
    };
};

export default Hotel