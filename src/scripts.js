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
        domUpdates.displayCurrentUserInfo(currentUser)
    })
    .catch(err => {
        if (!err.ok) {
            console.log(err);  
        };
    });


const confirmBooking = (date) => {
    currentHotel.getAvailableRooms(date);
};


// Event Listeners
checkIn.addEventListener('change', function () {
    confirmBooking(checkIn.value);
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
        
        domUpdates.displayCurrentUserInfo(currentUser);
    } else {
        domUpdates.confirmBooking(
            event,
            currentHotel.availableRooms.flat(1),
            currentUser
        );
    };
});

