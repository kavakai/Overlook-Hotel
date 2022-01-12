class User {
    constructor(user) {
        this.name = user.name;
        this.id = user.id;
        this.allBookings = [];
        this.pastBookings = [];
        this.futureBookings = [];
        this.totalSpent = 0;
    }

    getAllBookings(bookings) {
        bookings.forEach(booking => booking.userID === this.id ? this.allBookings.push(booking) : booking);
    };

    getPastAndFutureBookings() {
        this.futureBookings = [];
        this.pastBookings = [];
        this.allBookings.forEach(booking => {
            let todayDate = new Date()
            let dateOne = new Date(booking.date);
            if (dateOne < todayDate && booking.userID === this.id) {
                this.pastBookings.push(booking)
            } else if (booking.userID === this.id && dateOne > todayDate) {
                this.futureBookings.push(booking);
            };
        });
    };

    getTotalSpent(rooms) {
        rooms.forEach(room => this.pastBookings.forEach(booking => booking.roomNumber === room.number ? this.totalSpent += room.costPerNight : booking));
    };
}

export default User
