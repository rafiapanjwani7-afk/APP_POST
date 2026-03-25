// GLOBALS
var editCard = null;
var cardBg = "";

// LOGIN
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (email && password) {

    // ✅ SAVE LOGIN STATE
    localStorage.setItem("isLogin", true);

    Swal.fire({
      icon: "success",
      title: "Login Successful",
    });

    setTimeout(() => {
      window.location = "index.html";
    }, 1000);

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

  localStorage.setItem("user", JSON.stringify(user));

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

// PROTECT DASHBOARD
if (window.location.pathname.includes("index.html")) {
  if (!localStorage.getItem("isLogin")) {
    window.location = "login.html";
  }
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

  // ✅ FIX: no moment dependency
  var currentTime = new Date().toLocaleString();

  // EDIT MODE
  if (editCard) {
    editCard.querySelector("p").innerText = title.value;
    editCard.querySelector("footer").innerText = description.value;
    editCard = null;

    title.value = "";
    description.value = "";
    return;
  }

  // NEW POST
  posts.innerHTML += `
  <div class="card mb-2">
    <div class="card-header">
      ~Post <br>
      <small style="color:#6e8692;">${currentTime}</small>
    </div>

    <div class="card-body" style="background-image:url(${cardBg}); background-size:cover;">
      <blockquote class="blockquote">
        <p>${title.value}</p>
        <footer class="blockquote-footer">${description.value}</footer>
      </blockquote>
    </div>

    

      <div class="d-flex gap-4 ms-auto mt-1 mb-1">
        <button class="btn color p-0 small" onclick="editPost(this)">
          Edit
        </button>
        <button class="btn color p-0 small" onclick="delPost(this)">
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
  var card = btn.parentNode.parentNode.parentNode;
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      card.remove();
    }
  });
}

function editPost(btn) {
  var card = btn.closest(".card");
  document.getElementById("title").value = card.querySelector("p").innerText;
  document.getElementById("description").value = card.querySelector("footer").innerText;
  editCard = card;
}


// function colorChange(btn) {
//   btn.classList.toggle("liked");
//   btn.innerText = btn.classList.contains("liked") ? "Liked" : "Like";
// }

// IMAGE
function addImg(src, event) {
  cardBg = src;

  var bgImg = document.getElementsByClassName("bgImg");

  for (var i = 0; i < bgImg.length; i++) {
    bgImg[i].classList.remove("addImg");
  }

  event.target.classList.add("addImg");
}