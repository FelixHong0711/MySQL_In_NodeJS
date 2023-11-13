// Create function to validate form when login
function SubmitCheck() {
    // Username validation
    let userInput = document.getElementById("userInput").value;

    if (userInput.trim() === "") {
        document.getElementById("userValidate").classList.add("text-danger");
        document.getElementById("userValidate").classList.remove("text-success");
        document.getElementById("userValidate").style.fontStyle = "italic";
        document.getElementById("userValidate").innerHTML = "<p>Please enter your username</p>";
        return false;
    }
    else {
        document.getElementById("userValidate").classList.remove("text-danger");
        document.getElementById("userValidate").innerHTML = "<p></p>";
    }

    // Password validation
    let password = document.getElementById("password").value;

    if (password.trim() === "") {
        document.getElementById("passwordValidate").classList.add("text-danger");
        document.getElementById("passwordValidate").classList.remove("text-success");
        document.getElementById("passwordValidate").style.fontStyle = "italic";
        document.getElementById("passwordValidate").innerHTML = "<p>Please enter a password</p>";
        return false;
    } else if (password.length < 8) {
        document.getElementById("passwordValidate").classList.add("text-danger");
        document.getElementById("passwordValidate").classList.remove("text-success");
        document.getElementById("passwordValidate").style.fontStyle = "italic";
        document.getElementById("passwordValidate").innerHTML = "<p>Password must be at least 8 characters long</p>";
        return false;
    }
    else {
        document.getElementById("passwordValidate").classList.remove("text-danger");
        document.getElementById("passwordValidate").innerHTML = "<p></p>";
    }
}

// Create function to validate form when register
function RegisterCheck() {

    // Full name validation
    let name = document.getElementById("name").value;

    if (name.trim() === "") {
        document.getElementById("nameValidate").classList.add("text-danger");
        document.getElementById("nameValidate").classList.remove("text-success");
        document.getElementById("nameValidate").style.fontStyle = "italic";
        document.getElementById("nameValidate").innerHTML = "<p>Please enter your full name</p>";
        return false;
    }
    else {
        document.getElementById("nameValidate").classList.remove("text-danger");
        document.getElementById("nameValidate").innerHTML = "<p></p>";
    }

    // Username validation
    let userName = document.getElementById("userName").value;

    if (userName.trim() === "") {
        document.getElementById("userNameValidate").classList.add("text-danger");
        document.getElementById("userNameValidate").classList.remove("text-success");
        document.getElementById("userNameValidate").style.fontStyle = "italic";
        document.getElementById("userNameValidate").innerHTML = "<p>Please enter your username</p>";
        return false;
    }
    else {
        document.getElementById("userNameValidate").classList.remove("text-danger");
        document.getElementById("userNameValidate").innerHTML = "<p></p>";
    }

    // Password validation
    let password = document.getElementById("passwordRe").value;

    if (password.trim() === "") {
        document.getElementById("passwordReValidate").classList.add("text-danger");
        document.getElementById("passwordReValidate").classList.remove("text-success");
        document.getElementById("passwordReValidate").style.fontStyle = "italic";
        document.getElementById("passwordReValidate").innerHTML = "<p>Please enter a password</p>";
        return false;
    } else if (password.length < 8) {
        document.getElementById("passwordReValidate").classList.add("text-danger");
        document.getElementById("passwordReValidate").classList.remove("text-success");
        document.getElementById("passwordReValidate").style.fontStyle = "italic";
        document.getElementById("passwordReValidate").innerHTML = "<p>Password must be at least 8 characters long</p>";
        return false;
    }
    else {
        document.getElementById("passwordReValidate").classList.remove("text-danger");
        document.getElementById("passwordReValidate").innerHTML = "<p></p>";
    }
    // Mail validation
    let mail = document.getElementById("email").value;
    let mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Improved email pattern
    if (mail.trim() === "" || !mailPattern.test(mail)) {  // Corrected condition to check for invalid email
        document.getElementById("emailValidate").classList.add("text-danger");
        document.getElementById("emailValidate").classList.remove("text-success");
        document.getElementById("emailValidate").style.fontStyle = "italic";
        document.getElementById("emailValidate").innerHTML = "<p>Please enter a valid email with '@'</p>";
        return false;
    }
    else {
        document.getElementById("emailValidate").classList.remove("text-danger");
        document.getElementById("emailValidate").innerHTML = "<p></p>";
    }

    // Phone validation
    let phone = document.getElementById("phone").value;
    let phonePatternText = /\D/;
    if (phone.trim() !== "" && phonePatternText.test(phone)) {
        phonePatternText = phonePatternText.exec(phone);
        document.getElementById("phoneValidate").classList.add("text-danger");
        document.getElementById("phoneValidate").classList.remove("text-success");
        document.getElementById("phoneValidate").style.fontStyle = "italic";
        document.getElementById("phoneValidate").innerHTML = "<p>Contains character '" + phonePatternText + "'. Numbers only!</p>";
        return false;
    } else if (phone.trim() === "" || phone.length !== 10) {
        document.getElementById("phoneValidate").classList.add("text-danger");
        document.getElementById("phoneValidate").classList.remove("text-success");
        document.getElementById("phoneValidate").style.fontStyle = "italic";
        document.getElementById("phoneValidate").innerHTML = "<p>Phone number must be exactly 10 digits</p>";
        return false;
    }
    else {
        document.getElementById("phoneValidate").classList.remove("text-danger");
        document.getElementById("phoneValidate").innerHTML = "<p></p>";
    }
}


// Create function to reset error messages
function Reset() {
    document.getElementById("userValidate").innerHTML = "";
    document.getElementById("passwordValidate").innerHTML = "";
}
// Create function to reset error messages
function ResetRe() {
    document.getElementById("nameValidate").innerHTML = "";
    document.getElementById("userNameValidate").innerHTML = "";
    document.getElementById("passwordReValidate").innerHTML = "";
    document.getElementById("emailValidate").innerHTML = "";
    document.getElementById("phoneValidate").innerHTML = "";
}

// Create function to show/hide password
function ShowPassword() {
    let password = document.getElementById("password");
    let showPasswordButton = document.getElementById("showPassword");

    if (password.type === "password") {
        password.type = "text";
        showPasswordButton.innerHTML = '<img src="hide_pass.png" style="width: 40%;" alt="HidePass">';
    } else {
        password.type = "password";
        showPasswordButton.innerHTML = '<img src="show_pass.png" style="width: 40%;" alt="ShowPass">';
    }
}
// Create function to show/hide password
function ShowPasswordRe() {
    let password = document.getElementById("passwordRe");
    let showPasswordButton = document.getElementById("showPasswordRe");

    if (password.type === "password") {
        password.type = "text";
        showPasswordButton.innerHTML = '<img src="hide_pass.png" style="width: 40%;" alt="HidePass">';
    } else {
        password.type = "password";
        showPasswordButton.innerHTML = '<img src="show_pass.png" style="width: 40%;" alt="ShowPass">';
    }
}

// Create function to navigate to account log in when click login button
function LogIn() {
    window.location.href = "Account.html?action=login";
}
// Create function to navigate to account register when click signup button
function SignUp() {
    window.location.href = "Account.html?action=signup";
}

// Retrieve user id
window.onload = function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('userId');
    if (userId) {
        document.getElementById('hiddenUserId').value = userId;
    }
}

// Create activities happen after logging in successfully
document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem('userId');
    // Check if the user is logged in based on the query parameter
    const urlParams = new URLSearchParams(window.location.search)
    console.log(urlParams.get('loggedin') === "true")

    if (urlParams.get('loggedin') === "true") {
        var loginButton = document.getElementById("loginBtn");
        var signupBtn = document.getElementById("signupBtn");
        var logoutButton = document.getElementById("logoutBtn");
        var commentLogIn = document.getElementById("commentLogIn");
        var tutorialLogIn = document.getElementById("tutorialLogIn");
        var homeLogIn = document.getElementById("homeLogIn");
        var logo = document.getElementById("logo");

        // User is logged in, show logout button
        loginButton.style.display = "none";
        signupBtn.style.display = "none";
        logoutButton.style.display = "block";

        // Pages after signing in
        commentLogIn.setAttribute("href", `Comment.html?loggedin=true&userID=${userId}`);
        tutorialLogIn.setAttribute("href", `Tutorial.html?loggedin=true&userID=${userId}`);
        homeLogIn.setAttribute("href", `Home.html?loggedin=true&userID=${userId}`);
        logo.setAttribute("href", `Home.html?loggedin=true&userID=${userId}`);

        // Comment appear only after signing in
        try {
            var signinCommand = document.getElementById("signinCommand");
            signinCommand.style.display = "none";
        } catch { }
        try {
            var commentContent = document.getElementById("commentContent");
            commentContent.style.display = "block";
        } catch { }
    }
});

// When log out, navigate back to Home.html
function LogoutAccount() {
    window.location.href = "Home.html";
}

// FormatDate
function FormatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update the "Last update" date when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const lastUpdateElement = document.getElementById("lastUpdate");
    const currentDate = new Date();
    const formattedDate = FormatDate(currentDate);
    lastUpdateElement.textContent = `Last update: ${formattedDate}`;
});