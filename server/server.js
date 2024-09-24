const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));
app.use(express.urlencoded({extended:true}))
// Global variable that will contain all of the
// calculation objects:
let calculations = [{
  num1: 3,
  num2: 9,
  op: '*',
  answer: 27}, 
  {
  num1: 8,
  num2: 2,
  op: '-',
  answer: 6}, 
  {
    num1: 4,
    num2: 5,
    op: '+',
    answer: 9
  }
];

// Here's a wonderful place to make some routes:
// GET /calculations
app.get('/calculations', (req, res) => {
  const recentCalculations = calculations[calculations.length -1];
  res.json({
    recentResult: recentCalculations,
    history: calculations
  });

//POST /calculations adds 
app.post('/calculations', (req, res) => {

  let calculationsToAdd = req.body
  
  const {numOne, numTwo, operator } = req.body;
  if (numOne === undefined);
    else if (numTwo === undefined);
  else if(operator === undefined)
  console.log("post calculation hit!", req.body)
// return res.status(201)
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
// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
