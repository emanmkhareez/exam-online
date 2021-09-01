'use strict';

const client=require('socket.io-client');

// const express = require('express')
// const app = express()




const host = 'http://localhost:3000/exam';
const socket = client.connect(host);
const store = 'alaa';

socket.emit('join', store);


const Question='question 1'
socket.emit('exam',Question)




socket.on('students_Answers', showAnswer)

function showAnswer(chore){
    console.log(`The answer is  ${chore.chore.answer} From ${chore.chore.name}`)
}


