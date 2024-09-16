
function onReady() {
    console.log('client.js is sourced!')
}
let numOne = '';
let numTwo = '';
let operator = '';
let selectedOperator = false;

function Btn(value) {
    let display = document.getElementById('display');
    if (!selectedOperator){
        numOne += value;
        display.value = numOne;
    } else {
        numTwo += value;
        display.value = numTwo;
    }
}
function clearInputs() { //function to clear inputs
    numOne = '';
    numTwo = '';
    operator = '';
    selectedOperator = false;
}