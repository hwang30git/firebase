/**
 * @TODO get a reference to the Firebase Database object
 */
// gives us a variable we can use to read/write
const database = firebase.database().ref();

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
const allMessages = document.getElementById("all-messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-btn");

// call updateDB whenever we click "Send"
sendButton.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */
function updateDB(event) {
    // prevent page from refreshing
    event.preventDefault();

    // create an object with the data we want to add
    const row = {
        USERNAME: usernameInput.value,
        MESSAGE: messageInput.value
    };

    database.push(row);
}

/**
 * @TODO add the addMessage function as an event
 * handler for the "child_added" event on the database
 * object
 */
// called one time for each entry in database on page load
// & for each entry added
database.on("child_added", addMessage);

/**
 * @TODO create a function called addMessage that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 * 
 */
function addMessage(rowData) {
    const messageObject = rowData.val();

    console.log(messageObject);

    let messageDiv = makeSingleMessageHTML(messageObject.USERNAME, messageObject.MESSAGE);

    allMessages.appendChild(messageDiv);
}

/** 
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 * 
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username 
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 * 
 *      - returns the parent div
 */
function makeSingleMessageHTML(usernameTxt, messageTxt) {
    // create a parent div to hold the entire username + message line
    let parentDiv = document.createElement("div");
    parentDiv.classList.add("single-message");

    let usernameDisplay = document.createElement("p");
    usernameDisplay.classList.add("single-message-username");
    // update the inner HTML to include the username
    usernameDisplay.innerHTML = usernameTxt;
    // put the username display inside the parent div
    parentDiv.appendChild(usernameDisplay);

    // create box for message text
    let messageDisplay = document.createElement("p");
    messageDisplay.innerHTML = messageTxt;
    parentDiv.appendChild(messageDisplay);

    // return the entire username+message box
    return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 * 
 * @BONUS use an arrow function
 */