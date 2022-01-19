const ids = [
  "welcome",
  "pastStay",
  "totalSpent",
  "futureStay",
  "mainScreen",
  "rooms",
  "welcomePage",
];
const [welcomeMsg, pastStay, totalAmt, futureStay, mainDisplay, allRoomsSection, mainImg] = ids.map(id => document.getElementById(id));
const loginPage = document.querySelector(".login")
const nav = document.querySelector(".nav-buttons")
const logOutBtn = document.querySelector(".log-out-btn")

const domUpdates = {
  hide(elements) {
    elements.map(element => element.classList.add('hidden'))
  },

  show(elements) {
    elements.map((element) => element.classList.remove('hidden'));
  },

  displayCurrentUserInfo(user, rooms) {
    this.hide([loginPage, allRoomsSection]);
    this.show([mainDisplay, nav, logOutBtn, mainImg]);
    welcomeMsg.innerText = '';
    pastStay.innerHTML = '';
    totalAmt.innerText = '';
    futureStay.innerHTML = '';
    user.pastBookings.map((booking) => {
      const room = rooms.find(room => {
        if (room.number === booking.roomNumber) {
          return room.roomType;
        }
      });
      welcomeMsg.innerText = `
                Welcome back ${user.name}
            `;
      pastStay.innerHTML += `
             <tr>
              <td id="pastStayDate">${booking.date}</td>
              <td id="pastStayRoom">${booking.roomNumber} #</td>
              <td id="pastStayType">${room.roomType}</td>
            </tr>
            `;

      totalAmt.innerText = `You have spent $${user.totalSpent.toFixed(2)} on past visits`;
    });
    user.futureBookings.map((booking) => {
      const room = rooms.find((room) => {
        if (room.number === booking.roomNumber) {
          return room.roomType;
        }
      });
      futureStay.innerHTML += `
             <tr>
              <td id="futureStayDate">${booking.date}</td>
              <td id="futureStayRoom">${booking.roomNumber} #</td>
              <td id="futureStayType">${room.roomType}</td>
            </tr>
            `;
    });
  },

  displayAvailableRooms(rooms) {
    this.hide([mainImg]);
    this.show([allRoomsSection]);
    allRoomsSection.innerHTML = '';
    if (!rooms.length) {
      allRoomsSection.innerHTML = `
            <h1 id="noRooms">We are so sorry. There are no available rooms for the dates you suggested. Please try another date</h1>`
    } else {
      rooms.forEach((room) => {
        let beds;
        if (room.numBeds > 1) {
          beds = 'beds'
        } else {
          beds = "bed";
        }  
        allRoomsSection.innerHTML += `
            <article id="roomDisplay">
                <h1>SELECT A ROOM ABOVE TO BOOK</h1>
                <li class="type-of-room">${room.roomType.toUpperCase()}</li>
                <li id="roomNum">Room number ${room.number}.</li>
                <li id="bidet">Has a bidet? ${room.bidet}.</li>
                <li id="numBeds">Has ${room.numBeds} ${room.bedSize} ${beds}.</li>
                <li id="cost">Price per night is ${room.costPerNight}.</li>
            </article>`;
      });
    }
  },

  filterRooms(filter, rooms) {
    allRoomsSection.innerHTML = '';
    if (filter === 'Select Room Type') {
      this.displayAvailableRooms(rooms)
    } else {
      const filtered = rooms.filter(room => room.roomType === filter)
      if (filtered.length > 0) {
        filtered.forEach(room => {
          allRoomsSection.innerHTML += `
                        <article id="roomDisplay">
                        <h1 class="type-of-room">${room.roomType.toUpperCase()}</h1>
                         <li id="roomNum">Room number ${room.number}.</li>
                        <li id="bidet">Has a bidet? ${room.bidet}.</li>
                        <li id="numBeds">Has ${room.numBeds} beds.</li>
                        <li id="cost">Price per night is ${room.costPerNight}.</li>
                        <button class="book-button" id=${room.number}>Book</button>
                        </article>`;
        });
      } else {
        allRoomsSection.innerHTML = `
                <h1 id="noRooms">We are so sorry. There are no available ${filter}'s. Please try another room type.</h1>`
      }
    }
  },
  
  popUpWindow(data) {
    allRoomsSection.innerHTML = `
        <h1 id="message">${data.message}</h1>
        <h3>We look forward to seeing you on ${data.newBooking.date}</h3>
        <h3>Here is your room number: 
        ${data.newBooking.roomNumber}</h3>
        <button id="mainPageBtn">Home</button>
        `
  },

  displayErr(name, message) {
    const page = document.getElementById(name)
    page.innerHTML = `
    <h1 id="message">${message}. Please try again.</h1>
    `;
  }

};

export default domUpdates;
