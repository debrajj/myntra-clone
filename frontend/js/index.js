var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
    var radios = document.getElementsByName("radio-btn");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
    slides[slideIndex - 1].style.display = "block";
    radios[slideIndex - 1].checked = true;
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }

/* ===========DEBRAJ ROY================ */
let name = localStorage.getItem("name");
  let token = localStorage.getItem("token");
  let user = document.getElementById("profile");
  if (nameinp) {
    user.innerText = nameinp;
  }

  let button = document.getElementById("List");
  button.addEventListener("click", () => {
    // localStorage.removeItem(name);
    // localStorage.removeItem(token);
    console.log(nameinp, token);
    localStorage.clear();
    user.innerText = "Profile";
  });






  