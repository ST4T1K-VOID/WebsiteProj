/* jshint esversion: 8 */

//UNUSED, didn't realise trivia genre was premium before I made this
// const trivia_genre_selector = document.getElementById("triviaGenre")

document.getElementById("trivia").addEventListener('input', () => {
    let displayArea = document.getElementById('responseDisplay');
    displayArea.innerHTML = null
    displayArea.style.visibility = "collapse";
})

document.getElementById("dadjokes").addEventListener('input', () => {
    let displayArea = document.getElementById('responseDisplay');
    displayArea.innerHTML = null
    displayArea.style.visibility = "collapse";
})


const key = 'Sg3i4GgkBddN3tGQIPJ2Gw==S65WmQEjAsmX8tfF';
const base_URL = 'https://api.api-ninjas.com/v1/';

document.getElementById("submitButton").addEventListener('click', (event) => {
    event.preventDefault();
    let checked_item = null;
    let request_message = base_URL;
    if (document.getElementById("trivia").checked){
        checked_item = document.getElementById("trivia");
        request_message = request_message + checked_item.value;
    }
    else if (document.getElementById("dadjokes").checked){
        checked_item = document.getElementById("dadjokes");
        request_message = request_message + checked_item.value;
    }
    else {
        generate_error("USER ERROR: Please select an option");
        return;
    }

    get_response(request_message, checked_item.value);
});

async function get_response(message, type) {
    fetch(message, {headers: {'x-api-key': key}})
    .then((response) => {
        if (response.ok) {
        return response.json();
        }
    throw response;
    })
    .then (function (data) {
        console.log(data);
        generate_response(type, data);
    })
    .catch((error) => {
        console.log("error full:", error, "error status code:", error.status);
        if (error.status == 400) {
            generate_error("PAGE ERROR: issue in code resulted in a bad request");
        }
        else if (error.status == 401) {
            generate_error("PAGE ERROR: Invalid API key"); //unable to force this one but theoretically possible
        }
        else if (error.status === 429){
            generate_error("USER ERROR: too many requests, limit is 60 per minute");
        }
        else if (error.status >= 403 && error <500){
            generate_error("PAGE ERROR: missing or invalid code is cause API request to fail");
        }
        else if (error.status >= 500 && error < 600){
            //network errors, not much point having seperate messages
            //for issues with another website, all that matters is that it is unavailable
            generate_error("NETWORK ERROR: API is down or otherwise unavailable");
        }
        else {
            //incorrect URL does not give a status code
            generate_error("PAGE ERROR: URL not found");
        }
    });
}

function generate_error(message){
    let response = document.getElementById('errorDisplay');
    response.textContent = message;
    response.style.visibility = 'visible';
}

function generate_response(type, data){
    let displayArea = document.getElementById('responseDisplay');
    clear_children(displayArea.innerHTML);
    if (type == 'dadjokes'){
        let extracted_data = data[0].joke;
        displayArea.innerHTML = (`<p>${extracted_data}</p>`);

        displayArea.style.visibility = "visible";
        document.getElementById('errorDisplay').style.visibility = 'collapse';
        return;
    }
    else if (type == 'trivia'){
        let extracted_data = [data[0]['question'], data[0]['answer']];
        displayArea.innerHTML = (`<p>Question:</p><br>
            <p>${extracted_data[0]}</p><br>
            <p>Answer:</p><br>
            <p>${extracted_data[1]}</p>`);

        displayArea.style.visibility = "visible";
        document.getElementById('errorDisplay').style.visibility = 'collapse';
        return;
    }
}


function clear_children(element){
    while (element.firstChild){
        element.removechild(element.firstChild);
    }
}