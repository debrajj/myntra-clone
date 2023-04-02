const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  localStorage.setItem('checkoutData', JSON.stringify(data));
  form.reset();
  alert('Data stored successfully!');
});
