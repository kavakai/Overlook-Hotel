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
            </tr>
            `;

            totalAmt.innerText = `$${user.totalSpent} Spent on Rooms`
        });
        user.futureBookings.map(booking => {
            futureStay.innerHTML += `
             <tr>
              <td id="futureStayDate">${booking.date}</td>
              <td id="futureStayRoom">${booking.roomNumber} #</td>
            </tr>
            `;
        })
        // display 'welcome user.name'
        // past bookings => table with date of stay, room# 
    }
};

export default domUpdates
