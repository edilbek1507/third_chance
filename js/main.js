let accordian = document.getElementsByClassName("FAQ__title");
const register = document.querySelector(".register");
for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

let signInButton = document.querySelector(".signin__button");
signInButton.addEventListener("click", (e) => {
  register.innerHTML = "";
  register.innerHTML = `
  <div class="box" id = "register">
  <div class="page">
    <div class="header">
      <a id="login" class="active" href="#login">login</a>
      <a id="signup" href="#signup">signup</a>
    </div>
    <div id="errorMsg"></div>
    <div class="content">
      <form
        class="login"
        name="loginForm"
        onsubmit="return validateLoginForm()"
        method="POST"
      >
        <input
          type="text"
          name="name"
          id="logName"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          id="logPassword"
          placeholder="Password"
        />
        <div id="check">
          <input type="checkbox" id="remember" />
          <label for="remember">Remember me</label>
        </div>
        <br /><br />
        <input type="submit" value="Login" />
        <a href="#">Forgot Password?</a>
      </form>
      <form
        class="signup"
        name="signupForm"
        onsubmit="return validateSignupForm()"
        method="POST"
      >
        <input
          type="email"
          name="email"
          id="signEmail"
          placeholder="Email"
        />
        <input
          type="text"
          name="name"
          id="signName"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          id="signPassword"
          placeholder="Password"
        /><br />
        <input type="submit" value="SignUp" />
      </form>
    </div>
  </div>
</div>`;
});

// ! Register

let registerBox = document.querySelector(".box");

$(window).on("hashchange", function () {
  if (location.hash.slice(1) == "signup") {
    $(".page").addClass("extend");
    $("#login").removeClass("active");
    $("#signup").addClass("active");
  } else {
    $(".page").removeClass("extend");
    $("#login").addClass("active");
    $("#signup").removeClass("active");
  }
});
$(window).trigger("hashchange");

function validateLoginForm() {
  let name = document.getElementById("logName").value;
  let password = document.getElementById("logPassword").value;
  registerBox.style.display = "none";
  if (name == "" || password == "") {
    document.getElementById("errorMsg").innerHTML =
      "Please fill the required fields";
    return false;
  } else if (password.length < 8) {
    document.getElementById("errorMsg").innerHTML =
      "Your password must include atleast 8 characters";
    return false;
  } else {
    alert("Successfully logged in");
    return true;
  }
}
function validateSignupForm() {
  let mail = document.getElementById("signEmail").value;
  let name = document.getElementById("signName").value;
  let password = document.getElementById("signPassword").value;
  registerBox.style.display = "none";
  if (mail == "" || name == "" || password == "") {
    document.getElementById("errorMsg").innerHTML =
      "Please fill the required fields";
    return false;
  } else if (password.length < 8) {
    document.getElementById("errorMsg").innerHTML =
      "Your password must include atleast 8 characters";
    return false;
  } else {
    alert("Successfully signed up");
    return true;
  }
}
