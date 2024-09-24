//Need render function that calls when page first loads
console.log('client.js sourced!')

let currentOperator 

//Takes OP from DOM onClick buttons
let setOperator = (event, op) => {
    event.preventDefault()

    currentOperator = op
    console.log("current operator:", currentOperator)
}

// function to 'GET' request to retrieve History 
let getHistory = () => {
    console.log("getHistory function is working!")
    //Axios call!
    axios({
        method: 'GET',
        url:'/getHistory'
    })
    .then((response) => {
        console.log('response received from getHistory:', response.data)
        let history = response.data
        renderHistory(history)

    })
    .catch((error) =>{
        console.log('error in "GET"/getHistory', error)
    })
}

getHistory()
//posts new calc. to /postHistory

let postHistory = (event) => {
    event.preventDefault()
        console.log('new history has been created')

        //Input field selectors
        let numOne = document.getElementById('numOne').value
        let numTwo = document.getElementById('numTwo').value

        let newHistory = {
            num1: numOne,
            num2: numTwo,
            operator: currentOperator,
        }
console.log('new send history', newHistory)
    
        axios({
            method: 'POST',
            url: '/postHistory',
            data: newHistory
        })
        .then((response) => {
            console.log('/postHistory successful!')

            //need to re-render the DOM.
            getHistory()
            // Clear form after 'post'
            clearForm(event)
        })
        .catch((error) => {
            console.error('error on POST/ postHistory', error)
            alert('POST not working')
        })
}
//render function
let renderHistory = (calcHistory) => {
    console.log(calcHistory)

    let resultHistory = document.getElementById('resultHistory')
    resultHistory.innerHTML = ""

    for (let history of calcHistory) {
        resultHistory.innerHTML += `
            <div>${history.num1} ${history.operator} ${history.num2} = ${history.result}</div>
        `
    }
    let recentResult = document.getElementById("recentResult")
    let lastHistory = calcHistory[calcHistory.length - 1]
    
    // Will only render last history if exists in the history array.
    if (lastHistory) {
        recentResult.innerHTML = `
        <div>${lastHistory.result}</div>
    `
    }

}

let clearForm = (event) => {
    event.preventDefault()
    //selectors for input fields
    document.getElementById("calcForm").reset()
    currentOperator = undefined
}

