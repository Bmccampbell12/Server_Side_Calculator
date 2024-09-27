//console.log('client.js sourced!')
//Global variable declared
let currentOperator;

document.getElementById('equalsButton').addEventListener('click', Calculate);
document.getElementById('clearButton').addEventListener('click', clearButton);

//runs upon page load
function onReady() {
    console.log('DOM loaded');
    getHistory();
}

//sets the current operator
function setOperator(op) {
    currentOperator = op;
    console.log("current operator:", currentOperator);


// function to 'GET' calculation History 
function getHistory() {
    console.log("getHistory function is working!")
    //Axios call!
    axios({
        method: 'GET',
        url:'/calculations',
    })
    .then((response) => {
        console.log('response received from getHistory:', response.data);
        renderHistory(response.data);
        renderRecentResult(response.data);
    }).catch((error) =>{
        console.log('Error in "GET" calculations', error)
    });
}
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
        };

console.log('new send history', newCalculation)
    
        axios({
            method: 'POST',
            url: '/calculations',
            data: newCalculation
        })
        .then((response) => {
            console.log("'POST' /calculations successful!");
            getHistory()           //need to re-render the DOM. getHistory()
            // Clear form after 'post'
        })
        .catch((error) => {
            console.error('error on POST/ calculations', error)
            alert('calculations not working')
        });
}
//render function
function renderHistory(calculations) {
let resultHistory = document.getElementById('resultHistory');
resultHistory.innerHTML = "<h2>Result History</h2>";

    calculations.forEach(calc => {
        resultHistory.innerHTML += `
            <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
        `;
    });
}

    function renderRecentResult(calculations) {
        let recentResult = document.querySelector('recentResultDisplay');
        if (calculations.length > 0) {
            let lastCalc = calculations[calculations.length -1];
            recentResult.innerHTML += `<div>${lastCalc.result}</div>`;
         } else {
                recentResult.textContent = "no recent result"
            }
    }




function clearInputs() {
    
    document.getElementById('numOne').value = '';
    document.getElementById('numTwo').value = '';
     //selectors for input fields
    currentOperator = undefined;
    console.log('form cleared');
    
function onReady() {
    getHistory();

}


}
