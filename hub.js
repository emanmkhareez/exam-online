const cv=require('opencv4nodejs')
const path=require('path')
const express=require('express')

const app=express() 
const server=require('http').Server(app)
const io=require('socket.io')(server)
const FPS=10
const wCap=new cv.VideoCapture(0)
wCap.set(cv.CAP_PORT_FRAME_WIDTH,300)
wCap.set(cv.CAP_PROT_FRAME_HEIGHT,300)
app.listen(3000,()=>{
    console.log('im listen😍')

})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
setInterval(()=>{
    const frame=wCap.read()
    const image=cv.imencode('.jpg',frame).toString('base64')
    io.emit('image',image)
},1000/ FPS)
// 'use strict';

// const port = process.env.PORT || 3000;

// const io = require('socket.io')(port)
// const uuid=require('uuid').v4;

// const msgQueue = {
//     orders:{}
// }


// const exam=io.of('/exam')

// exam.on('connection',socket=>{

//     socket.on('join', room => {
//         console.log('room name: ', room);
//         socket.join(room);
//     });
//     console.log('Conected Sucsses',socket.id);

//     socket.on('exam',examFun);

//     function examFun(payload) {

//         //console.log('adding a new order .... ',payload.orderID);
//         const id=uuid();
//         //console.log('ID =====>  ',id);

//         msgQueue.orders[id]=payload
//         // socket.emit('added',payload);
//         exam.emit('examStu',{id:id, payload:msgQueue.orders[id]});

//         console.log('After Add MsgQueue ======> ',msgQueue.orders);
//         let order={
//             event:'pickup',
//             time:new Date(),
//             payload
//         };

//         console.log('Event',order);
        
//     }

//     exam.on('answer',answerFun)

//     function answerFun(chore){

//     }

//     socket.on('get_all',()=>{
//         console.log('Get_All : Driver Wants To Get Has Orders  ');

//         Object.keys(msgQueue.orders).forEach(id=>{
//             socket.emit('order',{id:id,payload:msgQueue.orders.id})
//         });
//     });

//     socket.on('received',msg=>{
//         console.log('Received On Queue Will Remove It .... ');

//         // remove after it received 
//         delete msgQueue.orders[msg.id];
//         console.log('After Delete MsgQueue @@@@@@@@ ', msgQueue.orders);
//     });

//     // For InTransit

//     socket.on('InTransit',inTransit)

//     function inTransit(payload) {
//         let order = {
//             event:'InTransit',
//             time:new Date(),
//             payload
//         };
//         console.log('Event',order);
        
//     }

//     // For Delivered 

//     socket.on('delivered',delivered);

//     function delivered(payload) {
//         let order={
//             event:'delivered',
//             time:new Date(),
//             payload
//         };
//         console.log('Event',order);

//         exam.emit('delivered',payload)
        
//     }

// });