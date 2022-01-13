import './css/base.scss';
import './domUpdates'
import { userData, roomsData, allBookingsData } from "./apiCalls";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/image-from-rawpixel-id-3018024-png.png';
import './images/turing-logo.png';
import './images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png'
import User from './Classes/User';

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
        console.log(data, 'userData')
        allUsers = data[0].customers.map(user => {
            return new User(user.name, user.id)
        })
        currentUser = allUsers[0][Math.floor(Math.random() * allUsers.length)]
        console.log(currentUser, 'user')
    })

