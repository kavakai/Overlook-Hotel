const welcomeMsg = document.getElementById("welcome");
const pastStay = document.getElementById("pastStay");
const totalAmt = document.getElementById("totalSpent");
const futureStay = document.getElementById("futureStay");
const mainDisplay = document.getElementById("mainScreen");

const domUpdates = {
  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  displayCurrentUserInfo(user) {
    user.pastBookings.map((booking) => {
      welcomeMsg.innerText = `
                Welcome ${user.name}
            `;
      pastStay.innerHTML += `
             <tr>
              <td id="pastStayDate">${booking.date}</td>
              <td id="pastStayRoom">${booking.roomNumber} #</td>
              <td id="pastStayType"></td>
            </tr>
            `;

      totalAmt.innerText = `$${user.totalSpent} Spent on Rooms`;
    });
    user.futureBookings.map((booking) => {
      futureStay.innerHTML += `
             <tr>
              <td id="futureStayDate">${booking.date}</td>
              <td id="futureStayRoom">${booking.roomNumber} #</td>
              <td id="futureStayType"></td>
            </tr>
            `;
    });
  },

    displayAvailableRooms(rooms) {
        this.hide(welcomeMsg);
        this.hide(pastStay);
        this.hide(totalAmt);
        this.hide(futureStay);
        this.hide(mainDisplay);
    const allRoomsSection = document.getElementById("rooms");
    allRoomsSection.innerHTML = "";
    rooms.forEach((room) => {
      allRoomsSection.innerHTML += `
            <article id="roomDisplay">
                <h1 id="roomType">${room.roomType.toUpperCase()}</h1>
                <li id="roomNum">${room.number}</li>
                <li id="bidet">${room.bidet}</li>
                <li id="numBeds">${room.numBeds}</li>
                <li id="cost">${room.costPerNight}</li>
            </article>`;
    });
  },

  filterRooms(value) {
    console.log(value, "value");
  },
  confirmBooking() {
    console.log("im confirming");
  },

  rejectBooking() {
    console.log("Im rejecting");
  },
};

export default domUpdates;
