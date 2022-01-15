import bookingsData from "../test/bookings-test-data";

const domUpdates = {

    displayCurrentUserInfo(user) {
        const welcomeMsg = document.getElementById('welcome');
        const pastStay = document.getElementById('pastStay');
        const totalAmt = document.getElementById('totalSpent');
        const futureStay = document.getElementById('futureStay');
        user.pastBookings.map(booking => {
            welcomeMsg.innerText = `
                Welcome ${user.name}
            `
            pastStay.innerHTML += `
             <tr>
              <td id="pastStayDate">${booking.date}</td>
              <td id="pastStayRoom">${booking.roomNumber} #</td>
              <td id="pastStayType"></td>
            </tr>
            `;

            totalAmt.innerText = `$${user.totalSpent} Spent on Rooms`
        });
        user.futureBookings.map(booking => {
            console.log(booking, 'booking')
            futureStay.innerHTML += `
             <tr>
              <td id="futureStayDate">${booking.date}</td>
              <td id="futureStayRoom">${booking.roomNumber} #</td>
              <td id="futureStayType"></td>
            </tr>
            `;
        });
    },

    confirmBooking() {

    },

    rejectBooking() {

    },
};

export default domUpdates
