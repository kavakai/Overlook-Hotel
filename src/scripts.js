import './css/base.scss';
import domUpdates from './domUpdates';
import { userData, roomsData, allBookingsData } from "./apiCalls";
import Room from './Classes/Room';
import User from './Classes/User';
import Bookings from './Classes/Bookings';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/image-from-rawpixel-id-3018024-png.png';
import './images/turing-logo.png';
import './images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png'
import Hotel from './Classes/Hotel';

const checkIn = document.getElementById("checkIn");
document.getElementById("checkIn").valueAsDate = new Date();
const today = new Date().toISOString().split("T")[0];
document.getElementById("checkIn").setAttribute('min', today);
const roomFilter = document.getElementById("roomType");
const roomSelector = document.querySelectorAll('.filter');
const bookRoomsSection = document.getElementById('rooms');
const homeBtn = document.getElementById('mainPageBtn');


// Global Variables
let currentUser;
let currentRoom;
let newBooking;
let allUsers = [];
let allRooms = [];
let allBookings = [];
let currentHotel;


Promise.all([userData, roomsData, allBookingsData])
    .then((data) => {
        allBookings.push(data[2].bookings);
        allRooms.push(data[1].rooms);
        allUsers = data[0].customers.map(user => {
            return new User(user)
        });
        currentUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        allBookings.forEach(booking => currentUser.getAllBookings(booking));
        allBookings.map(booking => new Bookings(booking));
        allRooms.map(room => new Room(room));
        currentUser.getTotalSpent(allRooms.flat(1))
        currentHotel = new Hotel(allRooms, allBookings, currentUser);
        console.log(currentUser, 'initial user')
        domUpdates.displayCurrentUserInfo(currentUser)
    })
    .catch(err => {
        if (!err.ok) {
            console.log(err);  
        };
    });

const confirmBooking = (event, rooms, currentUser) => {
        let today = new Date(checkIn.value).toISOString().split("T")[0];
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
          .then((data) => domUpdates.popUpWindow(data));
    }

const getUpdatedData = () => {
    const url = `http://localhost:3001/api/v1/customers/${currentUser.id}`
    const userData = fetch(url)
        .then(response => response.json());
    const newBookings = fetch("http://localhost:3001/api/v1/bookings")
        .then(response => response.json());
    Promise.all([userData, newBookings])
        .then(data => {
            currentUser = new User(data[0])
            allBookings = data[1]['bookings'];
            currentUser.getAllBookings(allBookings)
            currentUser.getTotalSpent(allRooms.flat(1))
            domUpdates.displayCurrentUserInfo(currentUser);
        })
        .catch(err => console.log(err))
};

const booking = (date) => {
    currentHotel.getAvailableRooms(date);
};




// Event Listeners
checkIn.addEventListener('change', function () {
    booking(checkIn.value);
    roomSelector.forEach(filter => {
      if (filter.defaultSelected) {
        filter.selected = true;
        return false;
        };
    });
});

roomFilter.addEventListener('change', function () {
    domUpdates.filterRooms(
        roomFilter.value,
        currentHotel.availableRooms.flat(1)
    );
});

bookRoomsSection.addEventListener('click', function (event) {
    if (event.target.id === 'mainPageBtn') {
        getUpdatedData(currentUser);
    } else {
        confirmBooking(
            event,
            currentHotel.availableRooms.flat(1),
            currentUser
        );
    };
});

