//console.log('client.js sourced!')
//Global variable declared
onReady();
//getHistory();
let currentOperator;

document.getElementById('equalsButton').addEventListener('click', Calculate);
document.getElementById('clearButton').addEventListener('click', clearButton);
//added function to get calculation history from the server.
function getHistory() {
    axios.get('/calculations')     
    .then(response => {
        console.log('calculations history has been received!', response.data);
        renderHistory(response.data);
    }).catch(error => {
        console.error('Error getting calculation history', error);
        alert('Calculation history failed to load');
    });
}
//runs upon page load
function onReady() {
    console.log('DOM loaded')
    getHistory();

}
//sets the current operator
function setOperator(op) {
    currentOperator = op;
    console.log("current operator:", currentOperator);


// function to 'GET' calculation History 
}

//posts new calculation

function Calculate() {

        console.log('onClick activated, POST request sent!');

        //Input field selectors
        let numOne = document.getElementById('numOne').value;
        let numTwo = document.getElementById('numTwo').value;

        let newCalculation = {
            numOne: numOne,
            numTwo: numTwo,
            operator: currentOperator,
        }

console.log('new send history', newCalculation)
    
        axios({
            method: 'POST',
            url: '/calculations',
            data: newCalculation

        }).then((response) => {
            console.log("'POST' /calculations successful!", response);
        }).catch((error) => {
            console.error('error on POST/ calculations', error)
            alert('calculations not working')
        });
}
//render function
function renderHistory(calculations) {
let renderHistory = document.getElementById('resultHistory');

renderHistory.innerHTML = "<h2>Result History</h2>";

    calculations.forEach(calc => {
        renderHistory.innerHTML += `
            <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
        `
        //console.error("element with Id 'resltHistory' not found")
    });
}
    function renderRecentResult(newCalculation) {
        let recentResult = document.getElementById('recentResultDisplay');
        recentResult.innerHTML = `${newCalculation.numOne} ${newCalculation.operator} ${newCalculation.numTwo} = ${newCalculation.result}`;
    } if (calculations.length > 0) {
            let lastCalc = calculations[calculations.length -1];
            recentResult.innerHTML += `<div>${lastCalc.result}</div>`;
            
         } else {
                recentResult.textContent = "no recent result"
            }
    




function clearInputs() {
    
    document.getElementById('numOne').value = '';
    document.getElementById('numTwo').value = '';
    // document.getElementById('recentResultDisplay').innerHTML = 'No Recent Result';
    //  selectors for input fields
    currentOperator = undefined;
    console.log('form cleared');
}
    
function onReady() {
   



}
