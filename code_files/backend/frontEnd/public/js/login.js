console.log("in js");
function openModal() {
    console.log("in js");
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("cpsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");    
    var match = document.getElementById("match");


	myInput.onkeyup = function() {
       console.log('helllooo')
        
        var lowerCaseLetters = /[a-z]/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /[A-Z]/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /[0-9]/g; // : Fill in the regular experssion for digits
        var minLength = 8; // : Change the minimum length to what what it needs to be in the question 
        var check = false;

        // Validate lowercase letters
        if(myInput.value.match(lowerCaseLetters)) {             
            letter.classList.remove("invalid"); 
            letter.classList.add("valid"); 
        } else {
            letter.classList.remove("valid"); 
            letter.classList.add("invalid"); 
        }

        // Validate capital letters        
        if(myInput.value.match(upperCaseLetters)) { 
            capital.classList.remove("invalid"); 
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers        
        if(myInput.value.match(numbers)) { 
            number.classList.remove("invalid"); 
            number.classList.add("valid"); 
        } else {
            number.classList.remove("valid"); 
            number.classList.add("invalid");
        }

        // Validate length
        if(myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
    confirmMyInput.onkeyup = function() {
                // Validate password and confirmPassword
                var passEqualsConfPass = (myInput.value == confirmMyInput.value); // TODO: Change this to the condition that needs to be checked so that the text entered in password equals the text in confirm password
                if(passEqualsConfPass) { 
                    match.classList.remove("invalid"); 
                    match.classList.add("valid"); 
                } else {
                    match.classList.remove("valid"); 
                    match.classList.add("invalid"); 
                }        

                // Disable or Enable the button based on the elements in classList
                enableButton(letter, capital, number, length, match);
    }
}


function enableButton(letter, capital, number, length, match) {
    var button = document.getElementById('my_submit_button');
    var condition = (!letter.classList.contains("invalid") && 
                    !capital.classList.contains("invalid") && 
                    !number.classList.contains("invalid") &&
                    !length.classList.contains("invalid") &&
                    !match.classList.contains("invalid"));
        if(condition) {       
                button.disabled = false;
        } else {
            button.disabled = true;
        }       
    }    


function onClickFunction() {
    var email = document.getElementById('email').value;
    var user = document.getElementById('user').value;
    var psw = document.getElementById('psw').value;

    var text = '{ "username":'+ user + ', "email":' + email + ', "password":'+ psw +'  }';
    console.log(text);

    alert("User created!")
}