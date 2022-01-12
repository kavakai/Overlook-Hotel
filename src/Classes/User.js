class User {
    constructor(user) {
        this.name = user.name;
        this.id = user.id;
        this.allBookings = [];
        this.pastBookings = [];
    }

    getAllBookings(bookings) {
        bookings.forEach(booking => booking.userID === this.id ? this.allBookings.push(booking) : booking);
    };

    getPastBookings() {
        this.allBookings.forEach(booking => {
            let todayDate = new Date()
            let dateOne = new Date(booking.date);
            dateOne > todayDate ? this.pastBookings.push(booking) : booking
        })
    }
    
}

export default User
