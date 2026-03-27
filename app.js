var editCard = null;
var cardBg = "";
var time = moment().format("MMMM Do YYYY, h:mm:ss a");
var islogin = false;
// LOGIN
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var userName = document.getElementById("name").value;

  if (email && password && userName) {
    islogin = true;
    localStorage.setItem("isLogin", true);
    Swal.fire({
      icon: "success",
      title: "Login Successful",
    });

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 400);

  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Email or Password",
    });
  }
}

function signfrom() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("userEmail").value;
  var password = document.getElementById("userPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // EMPTY CHECK
  if (!name || !email || !password || !confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "All fields are required",
    });
    return;
  }

  // PASSWORD MATCH CHECK
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords do not match",
    });
    return;
  }

  // SAVE USER
  var user = {
    name: name,
    email: email,
    password: password
  };



  Swal.fire({
    icon: "success",
    title: "Signup Successful",
  });

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
}
// LOGOUT
function logout() {
  localStorage.removeItem("isLogin");

  Swal.fire({
    icon: "success",
    title: "Logged out!",
    timer: 800,
    showConfirmButton: false,
  });

  setTimeout(() => {
    window.location = "login.html";
  }, 800);
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
      ~Post <br>
      <small style="color:#6e8692;">${time}</small>
    </div>
    <div class="card-body p-2" style="background-image:url(${cardBg}); background-size:cover;">
      <blockquote class="blockquote">
        <p class="p-2">${title.value}</p>
        <footer class="blockquote-footer p-2 card-text">${description.value}</footer>
      </blockquote>
    </div>

    

      <div class="d-flex gap-4 ms-auto mt-1 mb-1 ">
        <button class="btn color p-1 editBtn" onclick="editPost(this)">
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
  })
  card.remove()

}

function editPost(btn) {
  var card = btn.parentNode.parentNode;
  var Title = card.children[1].children[0].innerText
  var Description = card.children[1].children[1].innerText
  console.log(Title, Description);
  document.getElementById("title").value = Title
  document.getElementById("description").value = Description
  editCard = card
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