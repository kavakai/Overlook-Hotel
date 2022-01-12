class User {
    constructor(user) {
        this.name = user.name
        this.id = user.id
        this.bookings = [];
    }

    getBookings(bookings) {
        const userBookings = bookings.forEach(booking => booking.userID === this.id ? this.bookings.push(booking) : booking)
    }
}

export default User
