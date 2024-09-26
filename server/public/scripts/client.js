//console.log('client.js sourced!')

let currentOperator;

//runs upon page load
function onReady() {
    console.log('DOM loaded');
    getHistory();


//sets the current operator
function setOperator(op) {
    currentOperator = op;
    console.log("current operator:", currentOperator);
}

// function to 'GET' calculation History 
function getHistory() {
    console.log("getHistory function is working!")
    //Axios call!
    axios({
        method: 'GET',
        url:'/calculations'
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

function Calculate(event) {

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
            getHistory();           //need to re-render the DOM. getHistory()
            // Clear form after 'post'
        })
        .catch((error) => {
            console.error('error on POST/ calculations', error)
            alert('calculations not working')
        });
}
//render function
function renderHistory(calculations) {
let renderHistory = document.getElementById('resultHistory');
resultHistory.innerHTML = "<h2>Result History</h2>";

    for (let calc of calculations) {
        resultHistory.innerHTML += `
            <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
        `;
    }

}
    function renderRecentResult(calculations) {
        let recentResult = document.getElementById('recentResult');
        recentResult.innerHTML = `<h2>Recent Result</h2>`;

        if (calculations.length > 0) {
            let lastCalc = calculations[calculations.length -1];
            recentResult.innerHTML += `<div>${lastCalc.result}</div>`;
    }
}


function clearInput(event) {
    event.preventDefault();
    document.getElementById('calculator').reset(); 
     //selectors for input fields
    currentOperator = undefined;


console.log('form cleared');
}