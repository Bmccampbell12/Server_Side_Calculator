//Need render function that calls when page first loads
//and when new calculation is submitted. 

function onReady() { //renders history onload
console.log("onready( has been activated")

//gitHistory()

    getHistory()
};


onReady()

function calculate(op) {
    currentOperator = op
    console.log("incoming operator", op)
}

function postCalculation(event) {
    event.preventDefault()
    console.log("postCalculation() activated")


    let calculationToSend = {
        
            num1: num1,
            num2: num2,
            op: currentOperator,
    }
}

//render function thats called when new calc. is submitted
function getHistory () {
    let num1 = document.getElementById('numOne').value
    let num2 = document.getElementById('numTwo').value

    axios({
        method: 'GET',
        url: '/calculations',
        data: {calculationToSend}
    })

    .then((response) => {
        console.log("History from 'GET' request:", response.data)
    })
.catch((error) => {
    console.error(error)

})


}

function renderHistory(history) {
    console.log("renderHistory() has been activated", history)

//Get requestfrom server using axios, to retrieve history
//Call render history function with response.data
let recentResultSection = document.getElementById('recentResult')

recentResult = history(history.length-1).answer

console.log('recent result:', recentResult)

recentResultSection.innerHTML = `<span id="recentResultText"> </span>`

let resultHistory = document.getElementById('resultHistory')
console.log(resultHistory)

resultHistory.innerHTML += ""
//use history to render before re-rendering
for (let item of history) {
    console.log('current history item', item)

    resultHistory.innerHTML += `<li>${item.num1} ${item.num2} = ${item.anser} ${item.operator}</li>`
}
}


// let numOne = '';
// let numTwo = '';
// let operator = '';
// let selectedOperator = false;

// function Btn(value) {
//     let display = document.getElementById('display');
//     if (!selectedOperator){
//         numOne += value;
//         display.value = numOne;
//     } else {
//         numTwo += value;
//         display.value = numTwo;
//     }
// }
// function clearInputs() { //function to clear inputs
//     numOne = '';
//     numTwo = '';
//     operator = '';
//     selectedOperator = false;
