import './css/base.scss';
import domUpdates from './domUpdates';
import { userData, roomsData, allBookingsData } from "./apiCalls";
import Room from './Classes/Room';
import User from './Classes/User';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/image-from-rawpixel-id-3018024-png.png';
import './images/turing-logo.png';
import './images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png'

const checkIn = document.getElementById("checkIn")

// Global Variables
let currentUser;
let currentRoom;
let newBooking;
let allUsers = [];
let allRooms = [];
let allBookings = [];

Promise.all([userData, roomsData, allBookingsData])
    .then((data) => {
        allBookings.push(data[2].bookings);
        allRooms.push(data[1].rooms);
        allUsers = data[0].customers.map(user => {
            return new User(user)
        });
        currentUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        allBookings.forEach(booking => currentUser.getAllBookings(booking));
        currentUser.getTotalSpent(allRooms.flat(1))
        domUpdates.displayCurrentUserInfo(currentUser)
    });

const confirmBooking = () => {
    
}    

