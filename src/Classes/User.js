class User {
  constructor(user) {
    this.name = user.name || 'new user';
    this.id = user.id || Date.now();
    this.allBookings = [];
    this.pastBookings = [];
    this.futureBookings = [];
    this.totalSpent = 0;
  }

  getAllBookings(bookings) {
    bookings.forEach(booking => booking.userID === this.id ? this.allBookings.push(booking) : booking);
    this.getPastAndFutureBookings();
  }

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
      }
    });
    this.sortBookings()
  }

  getTotalSpent(rooms) {
    rooms.forEach(room => {
      this.pastBookings.forEach((booking) =>
        booking.roomNumber === room.number
          ? (this.totalSpent += room.costPerNight)
          : booking
      );
    });
    return this.totalSpent.toFixed(2)
  }

  sortBookings() {
    this.futureBookings = this.futureBookings.sort((bookingA, bookingB) => {
      return new Date(bookingA.date) - new Date(bookingB.date)
    });

    this.pastBookings = this.pastBookings.sort((bookingA, bookingB) => {
      return new Date(bookingB.date) < new Date(bookingA.date)
    });
  }
}

export default User
