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
