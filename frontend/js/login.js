
const form = document.querySelector("form");
const submit = document.querySelector(".btn");
const email = document.getElementById("email");
const password = document.getElementById("pass");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const obj = {
    email: email.value,
    password: pass.value,
  };

  fetch("http://localhost:9864//home/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(data.user);
      nameinp = data.user.name;
      console.log(nameinp);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", nameinp);
    
      window.location.href = "../index.html";
    })
    .catch((err) => console.log(err));
});