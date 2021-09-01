'use strict';

const readline = require('readline');

const client = require('socket.io-client');
const host = 'http://localhost:3000/exam';
const socket = client.connect(host);
const faker = require('faker');

const store = 'alaa';

socket.emit('join', store);
let q;

socket.emit('get_All_Question')

socket.on('examStu', answerFun)
function answerFun(payload) {
     q=payload
    console.log(`i have exam ${payload.payload}`)
  
    let answer = myAnswer()
    


}

function myAnswer() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log({
        q
    })
    rl.question(`${q.payload}`, (answer) => {
        
        // TODO: Log the answer in a database
        console.log(`Thank you for your valuable feedback: ${answer}`);

        let answerObject = {
            answer: answer,
            name: store
        }
        socket.emit('answer', answerObject)
        // rl.close();
        return answer

    });
   
}



