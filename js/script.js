let emailInput = document.querySelector('input[name="userEmail"]');
let emailSignUp = document.querySelector('input[name="userEmailSignUp"]');
let emailSignUpLabel = document.querySelector("label[for='userEmailSignUp']");
let userNameSignUp = document.querySelector('input[name="userNameSignUp"]');
let userNameSignUpLabel = document.querySelector("label[for='userNameSignUp']");
let passwordSignUp = document.querySelector('input[name="userPasswordSignUp"]');
let choosingAvatar = document.getElementById("choosingAvatar");
let avatars = document.querySelectorAll(".avatar-container img");
let finishButton = document.querySelector("#finishButton");
let activeAvatar;
let usersList = [];
let activeUser;

if (localStorage.getItem("userData") != null) {
  usersList = JSON.parse(localStorage.getItem("userData"));
  console.log(usersList);
}

finishButton.addEventListener("click", function () {
  let user = {
    username: userNameSignUp.value,
    email: emailSignUp.value,
    password: passwordSignUp.value,
    avatar: activeAvatar,
  };
  activeUser = user.email;
  localStorage.setItem("activeUser", JSON.stringify(activeUser));
  usersList.push(user);
  localStorage.setItem("userData", JSON.stringify(usersList));
  swal.fire({
    title: "Please wait we are redirecting you to the login page",
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    imageUrl: "images/bird-not-looking-to-password.png",
    html: `<div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`,
    timer: 4000,
  });
  setTimeout(function () {
    location.reload();
  }, 4000);
});

for (let i = 0; i < avatars.length; i++) {
  avatars[i].addEventListener("click", function (e) {
    removeFocusClassFromImages();
    e.target.classList.add("img-select");
    activeAvatar = e.target.getAttribute("src");
  });
}

function removeFocusClassFromImages() {
  for (let i = 0; i < avatars.length; i++) {
    avatars[i].classList.remove("img-select");
  }
}

let continueButton = document.querySelector("#continueButton");

continueButton.addEventListener("click", function () {
  switch (validation()) {
    case true:
      if (checkExistance()) {
        signUpForm.classList.replace("d-block", "d-none");
        choosingAvatar.classList.replace("d-none", "d-block");
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "error",
          title: "email already registered",
        });
      }
      break;
    case "userEmail is false":
      birdImage.setAttribute("src", "images/you-did-something-wrong.png");
      birdMessage.innerHTML = "Please enter your email correctly";
      break;
    case "userName is false":
      birdImage.setAttribute("src", "images/you-did-something-wrong.png");
      birdMessage.innerHTML = `User name should be at least 4 character maximum 10<br>including small letters, numbers &<br>special characters ('_', '.')`;
      break;
    case "userPassword is false":
      birdImage.setAttribute("src", "images/you-did-something-wrong.png");
      birdMessage.innerHTML = `Please enter a valid password:<br>1) Has at least two uppercase letters<br>2) Has at least one special case letter [!, @, #, $, &, *]<br>3) Has at least two digits<br>4) Has at least three lowercase letters<br>5) length from 8 to 15 character`;
      break;
  }
});

function checkExistance() {
  for (let i = 0; i < usersList.length; i++) {
    if (emailSignUp.value == usersList[i].email) {
      return false;
    }
  }
  return true;
}

function validation() {
  if (userNameRegex.test(userNameSignUp.value)) {
    if (userEmailRegex.test(emailSignUp.value)) {
      if (userPasswordRegex.test(passwordSignUp.value)) {
        return true;
      }
      return "userPassword is false";
    }
    return "userEmail is false";
  }
  return "userName is false";
}

let userNameRegex = /^[A-Za-z0-9_\.]{4,10}$/;
let userEmailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
let userPasswordRegex =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,15}$/;

let eyeIcon = document.querySelector(".fa-eye");
let eyeIconSlash = document.querySelector(".fa-eye-slash");

eyeIcon.addEventListener("click", function () {
  eyeIcon.classList.replace("d-block", "d-none");
  eyeIconSlash.classList.replace("d-none", "d-block");
  passwordInput.type = "password";
});
eyeIconSlash.addEventListener("click", function () {
  eyeIconSlash.classList.replace("d-block", "d-none");
  eyeIcon.classList.replace("d-none", "d-block");
  passwordInput.type = "text";
});

let passwordSignUpLabel = document.querySelector(
  "label[for='userPasswordSignUp']"
);
let emailInputLabel = document.querySelector("label[for='userEmail']");
let passwordInput = document.querySelector('input[name="userPassword"]');
let passwordInputLabel = document.querySelector("label[for='userPassword']");
let loginButton = document.querySelector("#loginButton");
let feedBackImage = document.querySelector("#feedBackImage");
let birdImage = document.querySelector("#feedBackImage");
let birdMessage = document.querySelector(".bird-feddback");
let signUpSwitchButton = document.querySelector("#signup-switch");
let loginSwitchButton = document.querySelector("#login-switch");
let signUpForm = document.querySelector("#signUpForm");
let logInForm = document.querySelector("#logInForm");

signUpSwitchButton.addEventListener("click", function () {
  signUpForm.classList.replace("d-none", "d-block");
  logInForm.classList.replace("d-block", "d-none");
});

loginSwitchButton.addEventListener("click", function () {
  signUpForm.classList.replace("d-block", "d-none");
  logInForm.classList.replace("d-none", "d-block");
  if (
    emailSignUp.value.length == 0 &&
    userNameSignUp.value.length == 0 &&
    passwordSignUp.value.length == 0
  ) {
    birdImage.setAttribute("src", "images/say-hello-to-user.png");
    birdMessage.innerHTML = "PLease fill the reuired data";
  }
});

function focusInputs(input, label) {
  label.style.top = "10px";
  label.style.fontSize = ".875rem";
  input.style.borderColor = "rgba(42, 221, 228, 1)";
}

function blurInputs(input, label) {
  if (input.value.length == 0) {
    label.style.top = "30px";
    input.style.borderColor = "#eee";
    label.style.fontSize = "1rem";
  }
}
emailSignUp.addEventListener("focus", function () {
  focusInputs(emailSignUp, emailSignUpLabel);
});
emailSignUp.addEventListener("blur", function () {
  blurInputs(emailSignUp, emailSignUpLabel);
});
emailSignUp.addEventListener("keyup", function () {
  if (userEmailRegex.test(emailSignUp.value)) {
    birdMessage.innerHTML = "Looks Good!";
    birdImage.setAttribute("src", "images/bird-not-looking-to-password.png");
  } else if (
    emailSignUp.value.length == 0 &&
    userNameSignUp.value.length == 0 &&
    passwordSignUp.value.length == 0
  ) {
    birdImage.setAttribute("src", "images/say-hello-to-user.png");
    birdMessage.innerHTML = "PLease fill the reuired data";
  }
});
userNameSignUp.addEventListener("focus", function () {
  focusInputs(userNameSignUp, userNameSignUpLabel);
});
userNameSignUp.addEventListener("blur", function () {
  blurInputs(userNameSignUp, userNameSignUpLabel);
});
userNameSignUp.addEventListener("keyup", function () {
  if (userNameRegex.test(userNameSignUp.value)) {
    birdMessage.innerHTML = "Looks Good!";
    birdImage.setAttribute("src", "images/bird-not-looking-to-password.png");
  } else if (
    emailSignUp.value.length == 0 &&
    userNameSignUp.value.length == 0 &&
    passwordSignUp.value.length == 0
  ) {
    birdImage.setAttribute("src", "images/say-hello-to-user.png");
    birdMessage.innerHTML = "PLease fill the reuired data";
  }
});
passwordSignUp.addEventListener("focus", function () {
  focusInputs(passwordSignUp, passwordSignUpLabel);
});
passwordSignUp.addEventListener("blur", function () {
  blurInputs(passwordSignUp, passwordSignUpLabel);
});
passwordSignUp.addEventListener("keyup", function () {
  if (userPasswordRegex.test(passwordSignUp.value)) {
    birdMessage.innerHTML = "Looks Good!";
    birdImage.setAttribute("src", "images/bird-not-looking-to-password.png");
  } else if (
    emailSignUp.value.length == 0 &&
    userNameSignUp.value.length == 0 &&
    passwordSignUp.value.length == 0
  ) {
    birdImage.setAttribute("src", "images/say-hello-to-user.png");
    birdMessage.innerHTML = "PLease fill the reuired data";
  }
});
emailInput.addEventListener("focus", function () {
  focusInputs(emailInput, emailInputLabel);
});
passwordInput.addEventListener("focus", function () {
  focusInputs(passwordInput, passwordInputLabel);
});
emailInput.addEventListener("blur", function () {
  blurInputs(emailInput, emailInputLabel);
});
passwordInput.addEventListener("blur", function () {
  blurInputs(passwordInput, passwordInputLabel);
});

// ? ===========================> Starting Loging Auth.

function authication() {
  for (let i = 0; i < usersList.length; i++) {
    if (emailInput.value == usersList[i].email) {
      if (passwordInput.value == usersList[i].password) {
        return true;
      } else {
        return "password is not correct";
      }
    }
  }
  return false;
}

loginButton.addEventListener("click", function () {
  if (authication() == true) {
    swal.fire({
      title: "Welcome Back Please Wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      imageUrl: "images/bird-logging-you-in.png",
      html: `<div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`,
      timer: 4000,
    });
    setTimeout(function () {
      location.assign("config.html");
      emailInput.value = "";
      passwordInput.value = "";
    }, 4000);
  } else if (authication() === "password is not correct") {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "error",
      title: "Please enter correct password",
    });
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      icon: "error",
      title: "Please enter correct email",
    });
  }
});
