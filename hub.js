'use strict';

const port = process.env.PORT || 3000;

const io = require('socket.io')(port)
const uuid = require('uuid').v4;

const msgQueue = {
    orders: {}
}

const students_Answers = {
    answers: []
}

const exam = io.of('/exam')

exam.on('connection', socket => {

    socket.on('join', room => {
        console.log('room name: ', room);
        socket.join(room);
    });

    console.log('Conected Sucsses', socket.id);

    socket.on('exam', examFun);

    function examFun(payload) {

        //console.log('adding a new order .... ',payload.orderID);
        const id = uuid();
        //console.log('ID =====>  ',id);

        msgQueue.orders[id] = payload
        // socket.emit('added',payload);
        exam.emit('examStu', { id: id, payload: msgQueue.orders[id] });

        console.log('After Add MsgQueue ======> ', msgQueue.orders);
        let order = {
            event: 'pickup',
            time: new Date(),
            payload
        };

        console.log('Event', order);

    }
    // Answers
    socket.on('answer', answerFun)

    function answerFun(choreObject) {

        let chore = choreObject.answer
        let name = choreObject.name
        console.log('Answer From :=>', name)
        console.log(chore)
        const id = uuid();
        //console.log('ID =====>  ',id);

        let answerQueueObject = {
            name: name,
            answer: chore
        }
        students_Answers.answers[id] = answerQueueObject

        // socket.emit('added',payload);
        exam.emit('students_Answers', { id: id, chore: students_Answers.answers[id] });

        console.log('After Add answer ======> ', students_Answers.answers);
        let answer = {
            event: 'answer',
            time: new Date(),
            chore
        };

        console.log('answer', answer);

    }


    ////////////////////////////////////////////
    // Students Questions 
    ///////////////////////////////////////////
    socket.on('get_All_Question', () => {
        console.log('Get_All : Questions to student  ');

        Object.keys(msgQueue.orders).forEach(id => {
            socket.emit('examStu', { id: id, payload: msgQueue.orders[id] })
        });
    })

    

});



