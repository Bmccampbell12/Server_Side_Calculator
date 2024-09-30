const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));
app.use(express.urlencoded({extended:true}))

// Global variable that will contain all of the

// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {  //listens for  GET req
  res.send(calculations); //response with calculations
});

//POST '/calculations adds 
app.post('/calculations', (req, res) => {   //listens for post request
let { numOne, numTwo, operator } = req.body;

let num1 = parseFloat(numOne); //performs math with numOne, numTwo, and op.
let num2 = parseFloat(numTwo);


  let result;

  if (operator === '+'){
    result = num1 + num2;
  } else if (operator === '-') {
    result = num1 - num2;
  }else if (operator === '*') {
    result = num1 * num2;
  }else if (operator ==='/') {
    result = num1 / num2;
  }else {
    return res.status(400).send('Invalid Operator');
  }
//makes sure the operators are valid. 

  let newCalculation = {
    numOne: num1,
    numTwo: num2,          //stores new calculation in newCalculation
    operator,
    result
  };
  calculations.push(newCalculation);  //newCalculation added using .push added to 201 status
  res.status(201).send(newCalculation);
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5002;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
app.post('/calculations', (req, res) => {
  res.send(calculations)
})
server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
