console.log('client.js sourced!')

//Global variable declared
let currentOperator;

//runs upon page load
function onReady() {
    console.log('DOM loaded'); //testing to make sure DOM loads
    getHistory(); //fetches calculations upon loading on page
} //event listener to run on onReady status
 document.addEventListener('DOMContentLoaded', onReady);

function setOperator(op) {
    currentOperator = op;      //sets current operator --> & logs it
    console.log("current operator:", currentOperator); // check 'current op'
}

//added function to get calculation history from the server.
function getHistory() {
    axios({
        method: 'GET',
        url: '/calculations'    //initail GET request  to server! finally passes npm test
    }).then(response => {
         console.log('calculations history has been received!'); // verifis history received
        
        let calculations = response.data; 
        renderHistory(calculations); //renders full history to the DOM
        if (calculations.length > 0) { //ensures number > 0 is input
            renderRecentResult(calculations[calculations.length - 1]); //Will render the most recent result in the Array
        } else {console.error('Error getting calculation history');

        }
  
    });
}


//posts new calculation 

function Calculate() {
console.log('onClick activated, POST request sent!');

        //Input field selectors
        let numOne = document.getElementById('numOne').value;  //retrieves from inputs & checks to make sure numbers are valid
        let numTwo = document.getElementById('numTwo').value;

        let newCalculation = {
            numOne: numOne,
            numTwo: numTwo,
            operator: currentOperator  //new cal. object declared
        };

console.log('posting calculation')
    
        axios({
            method: 'POST',  // POST request to server works!
            url: '/calculations',
            data: newCalculation
        }).then(() => {
            // console.log("'POST' /calculations successful!");
            getHistory();  //refeshes history
            clearInputs(); //clears inputs
        })
        .catch((error) => {
            console.error('error on POST/ calculations', error)
            alert('Cannot leave number fields blank')
        });
}
//render function
function renderHistory(calculations) {  //will take the arrau 'calculations' and display to DOM
let resultHistory = document.getElementById('resultHistory'); //checks dom for 'resultHistory'
resultHistory.innerHTML = "";
    calculations.forEach(calc => { // will iterate over each calculation and make a new div
        resultHistory.innerHTML += `
            <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div> 
        `; //concantinated to appear on DOM
        
    });
}           // function for recent results
    function renderRecentResult(calculation) { 
        let recentResult = document.getElementById('recentResultDisplay'); //directs recent calc. to DOM
        if (calculation) {
        recentResult.innerHTML = `${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}`;
    //again, concantinated to appear on DOM
         } else {
            console.error('"recentresultdisplay" not found'); //if no recent result to disply --> console.error
    
    }
}   

//function to clear inputs
function clearInputs() {
    
    document.getElementById('numOne').value = ''; //first input
    document.getElementById('numTwo').value = ''; // second input
    
    //  selectors for input fields
    currentOperator = undefined;
    console.log('form cleared');
}

