'use strict';

const client = require('socket.io-client');
const host = 'http://localhost:3000/exam';
const socket = client.connect(host);
const faker = require('faker');

const store = 'alaa';

socket.emit('join', store);



socket.on('examStu',answerFun)
function answerFun(payload){
    console.log(`i have exam ${payload.payload}`)
    const chore = process.argv.splice(2)[0];
    // console.log(chore)
    socket.emit('answer',chore)

}
// setInterval(()=>{
//     const payload={
//         store : process.env.STORE_NAME,
//         orderID:faker.datatype.uuid(),
//         customer:faker.name.findName(),
//         address:faker.address.streetAddress()
//     }

//     socket.emit('new_Order',payload);
//     socket.emit('pickUp',payload);
// },5000)

// socket.on('added',payload=>{
//     console.log('Thank You For Adding To Queue ',payload);
// });

// socket.on('delivered',delivered)

// function delivered(payload) {
//     console.log('Thank You For Delivering ',payload);
    
// }