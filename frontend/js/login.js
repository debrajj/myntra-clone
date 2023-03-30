
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
      localStorage.setItem("token", data.token);
      alert(data.msg);
      window.location.href = "./index.html";
    })
    .catch((err) => console.log(err));
});