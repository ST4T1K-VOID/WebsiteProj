/* jshint esversion: 8 */

document.getElementById('send_button').addEventListener("click", (event) => {
    
    event.preventDefault();

    const formName = document.getElementById('contact_name').value;
    const formEmail = document.getElementById('contact_email').value;
    const formMessage = document.getElementById('contact_message').value;

    document.getElementById("error_name").style.visibility = "collapse";
    document.getElementById("error_message").style.visibility = "collapse";
    document.getElementById("error_email").style.visibility = "collapse";
            document.getElementById("submit_success").style.visibility = "collapse";

    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errorcheck = false;
    if (!formName){
        errorcheck = true;
        message = document.getElementById("error_name");
        message.textContent = "Name is a required field";
        message.style.visibility = "visible";
    }
    if (!formMessage){
        errorcheck = true;
        message = document.getElementById("error_message");
        message.textContent = "Message is a required field";
        message.style.visibility = "visible";
    }

    if(!formEmail){
        errorcheck = true;
        message = document.getElementById("error_email");
        message.textContent = "Email is a required field";
        message.style.visibility = "visible";
    }
    else if (!regex.test(formEmail)){
        errorcheck = true;
        message = document.getElementById("error_email");
        message.textContent = "Invalid email! Valid email = username@provider.[TLD]";
        message.style.visibility = "visible";
    }
    if (errorcheck === false){
        document.getElementById("submit_success").style.visibility = "visible";
    }
} )