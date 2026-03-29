var editCard = null;
var cardBg = "";
var time = moment().format("MMMM Do YYYY, h:mm:ss a");
var loginPt = false;
var currentUser = "";
// LOGIN
function login() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var userName = document.getElementById("name").value.trim();

  if (email && password && userName) {
    loginPt = true;
    currentUser = userName.charAt(0).toUpperCase() + userName.slice(1);
    document.getElementById("logincontainer").style.display = "none";
    document.getElementById("postContainer").style.display = "block";
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome! " + currentUser
    });

  } else {
    Swal.fire({
      icon: "error",
      title: "Fill all fields",
    });

  }
}
// LOGOUT
function logout() {
  
  
  currentUser = "";

  Swal.fire({
    icon: "success",
    title: "Logged out!",
    timer: 800,
    showConfirmButton: false,
  });
document.getElementById("logincontainer").style.display = "block";
    document.getElementById("postContainer").style.display = "none";
 
}

function editPost() {
  var card = event.target.parentNode.parentNode;
  var title = card.children[1].children[0].children[0].innerText;
   var description = card.children[1].children[0].children[1].innerText;
    Swal.fire({
    icon: "info",
    title: "Edit Mode Activated",
    text: "You can now update your post",
    confirmButtonText: "Continue"
  }).then(() => {
    
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;

    editCard = card.remove();

  });

}
// POST FUNCTION
function post() {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var posts = document.getElementById("posts");

  if (!title.value.trim() || !description.value.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Title & description can't be empty!",
    });
    return;
  }
  // EDIT MODE
  if (editCard) {
    editCard.children[1].children[0].innerText = title.value;
    editCard.children[1].children[1].innerText = description.value;
    editCard = null;

    title.value = "";
    description.value = "";
    return;
  }

  // NEW POST
  posts.innerHTML += `
  <div class="card mb-2  ">
    <div class="card-header">
      ~${currentUser} <br>
      <small style="color:#6e8692;">${time}</small>
    </div>
    <div class="card-body p-2" style="background-image:url(${cardBg}); background-size:cover;">
      <blockquote class="blockquote">
        <p class="p-2">${title.value}</p>
        <footer class="blockquote-footer p-2 card-text">${description.value}</footer>
      </blockquote>
    </div>
      <div class="d-flex gap-4 ms-auto mt-1 mb-1 ">
        <button class="btn color p-1 editBtn" onclick="editPost()">
          Edit
        </button>
        <button class="btn color p-1 delectBtn" onclick="delPost(this)">
          Delete
        </button>
    </div>
  </div>
  `;

  title.value = "";
  description.value = "";
}

// DELETE
function delPost(btn) {
  var card = btn.parentNode.parentNode;
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      card.remove();
    }
  });
   
}
// IMAGE
function addImg(src) {
  cardBg = src;
  var bgImg = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImg.length; i++) {
    console.log(bgImg[i].className);
    bgImg[i].className = "bgImg"
  }
  event.target.classList.add("addImg");
}