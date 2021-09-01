'use strict';

// require('../teacher/teacher')

console.log('********************************')
let axios = require('axios')

let submitBtn = document.getElementById('sendQ')

submitBtn.addEventListener('click', submitFun)
function submitFun(event){
    event.preventDefault()
    axios.get('http://localhost:3002/teacher')

}