let userAvatar = document.querySelector("#userAvatar");
let userName = document.querySelector(".userName");
let activeUser = JSON.parse(localStorage.getItem("activeUser"));
let usersList = JSON.parse(localStorage.getItem("userData"));
let signOutButton = document.querySelector("#logOut");

for (let i = 0; i < usersList.length; i++) {
  if (activeUser == usersList[i].email) {
    userName.innerHTML = usersList[i].username;
    userAvatar.src = usersList[i].avatar;
  }
}

signOutButton.addEventListener("click", function () {
  swal.fire({
    title: "See you later have a nice day",
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    imageUrl: "images/bird-say-goodbye-logout.png",
    html: `<div class="spinner-grow" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>`,
    timer: 4000,
  });
  setTimeout(function () {
    location.replace("index.html");
  }, 4000);
});
