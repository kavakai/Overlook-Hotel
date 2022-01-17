import bookingsData from "../test/bookings-test-data";
import User from "./Classes/User";

const welcomeMsg = document.getElementById("welcome");
const pastStay = document.getElementById("pastStay");
const totalAmt = document.getElementById("totalSpent");
const futureStay = document.getElementById("futureStay");
const mainDisplay = document.getElementById("mainScreen");
const allRoomsSection = document.getElementById("rooms");

const domUpdates = {
    hide(elements) {
        elements.map(element => element.classList.add('hidden'))
    },

    show(elements) {
        elements.map(element => element.classList.remove('hidden'))
    },

    displayCurrentUserInfo(user) {
        // this.hide([allRoomsSection]);
        // this.show([mainDisplay, welcomeMsg, pastStay, totalAmt, futureStay]);
        welcomeMsg.innerText = '';
        pastStay.innerHTML = '';
        totalAmt.innerText = '';
        futureStay.innerHTML = '';
        allRoomsSection.innerHTML = `<img id="roomsImg" src="./images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png" alt="Grand Budapest Hotel Logo"></img>`
        user.pastBookings.map((booking) => {
            welcomeMsg.innerText = `
                Welcome back ${user.name}
            `;
            pastStay.innerHTML += `
             <tr>
              <td id="pastStayDate">${booking.date}</td>
              <td id="pastStayRoom">${booking.roomNumber} #</td>
              <td id="pastStayType"></td>
            </tr>
            `;

            totalAmt.innerText = `You have spent $${user.totalSpent.toFixed(2)} on past visits`;
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
        // this.hide([welcomeMsg, pastStay, totalAmt, mainDisplay]);
        // this.show([allRoomsSection]);
        allRoomsSection.innerHTML = '';
        if (rooms === []) {
            allRoomsSection.innerHTML = `
            <h1 id="noRooms">We are so sorry. There are no available rooms for the dates you suggested. Please try another date</h1>`
        } else {
            rooms.forEach((room) => {
                allRoomsSection.innerHTML += `
            <article id="roomDisplay">
                <h1 class="type-of-room">${room.roomType.toUpperCase()}</h1>
                <li id="roomNum">${room.number}</li>
                <li id="bidet">${room.bidet}</li>
                <li id="numBeds">${room.numBeds}</li>
                <li id="cost">${room.costPerNight}</li>
            </article>`;
            });
        };
    },

    filterRooms(filter, rooms) {
        console.log('it hits')
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
                        <li id="roomNum">${room.number}</li>
                        <li id="bidet">${room.bidet}</li>
                        <li id="numBeds">${room.numBeds}</li>
                        <li id="cost">${room.costPerNight}</li>
                        <button class="book-button" id=${room.number}>Book</button>
                        </article>`;
                });
            } else {
                allRoomsSection.innerHTML = `
                <h1 id="noRooms">We are so sorry. There are no available ${filter}'s. Please try another room type.</h1>`
            };
        };
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

};

export default domUpdates;
