import bookingsData from "../test/bookings-test-data";
import { userData } from "./apiCalls";

const welcomeMsg = document.getElementById("welcome");
const pastStay = document.getElementById("pastStay");
const totalAmt = document.getElementById("totalSpent");
const futureStay = document.getElementById("futureStay");
const mainDisplay = document.getElementById("mainScreen");
const allRoomsSection = document.getElementById("rooms");
const modal = document.getElementById("modal");

const domUpdates = {
    hide(element) {
        element.classList.add('hidden');
    },

    show(element) {
        element.classList.remove('hidden');
    },

    displayCurrentUserInfo(user) {
        console.log(user, 'user')
        this.hide(allRoomsSection);
        this.show(mainDisplay);
        this.show(welcomeMsg);
        this.show(pastStay);
        this.show(totalAmt);
        this.show(futureStay);
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

            totalAmt.innerText = `$${user.totalSpent.toFixed(2)} Spent on Rooms`;
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
        this.show(allRoomsSection);
        allRoomsSection.innerHTML = '';
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
    },

    filterRooms(filter, rooms) {
        const modal = document.querySelector('.modal')
        allRoomsSection.innerHTML = '';
        if (filter === 'Select Room Type') {
            this.displayAvailableRooms(rooms)
            console.log(window.getComputedStyle(modal), 'modal')
                if (window.getComputedStyle(modal).display === "none") {
                  modal.style.display = "block";
                };
        } else {
            const filtered = rooms.filter(room => room.roomType === filter)
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
        };
    },

    confirmBooking(event, rooms, currentUser) {
        let today = new Date().toISOString().split("T")[0];
        today = today.split("-").join("/");
        const roomBook = rooms.find(room => event.target.id == room.number);
        const booking = {
            "userID": currentUser.id,
            "date": today,
            "roomNumber": roomBook.number
        }
        const promise = fetch("http://localhost:3001/api/v1/bookings", {
            method: "POST",
            body: JSON.stringify(booking),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
        this.displayConfirm(promise);
    },
    
    displayConfirm(promise) {
        promise
            .then(data => this.popUpWindow(data))
    },

    rejectBooking() {
    console.log("Im rejecting");
    },
  
    popUpWindow(data) {
        allRoomsSection.innerHTML = `
        <h1 id="message">${data.message}</h1>
        <h3>We look forward to seeing you on ${data.newBooking.date}</h3>
        <h3>Here is your room number: 
        ${data.newBooking.roomNumber}</h3>
        <button id="mainPageBtn">Home</button>
        `
  }
};

export default domUpdates;
