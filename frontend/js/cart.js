let data = JSON.parse(localStorage.getItem("cart")) || [];
console.log(data);

let dataDiv = document.createElement("div");
dataDiv.setAttribute("id", "dataDiv");

const displayData = (data) => {
  dataDiv.innerHTML = "";
  data.forEach((el) => {
    let div = document.createElement("div");
    div.setAttribute("class", "outerDiv");

    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");
    let img = document.createElement("img");
    img.src = el.Image;
    imgDiv.append(img);

    let description = document.createElement("div");
    description.setAttribute("class", "description");
    description.innerHTML = `<div>
        <div class="categoryname"> ${el.category}</div>
        <div class ='Name'> ${el.Name}</div>
        <div class="selectDiv">
            <select name="size" id="size">
                <option value="S">SIZE: S</option>
                <option value="M">SIZE: M</option>
                <option value="L">SIZE: L</option>
                <option value="XL">SIZE: XL</option>
                <option value="XXL">SIZE: XXL</option>
            </select>
            <select name="quantity" id="quantity">
                <option value="1">Qty: 1</option>
                <option value="2">Qty: 2</option>
                <option value="3">Qty: 3</option>
                <option value="4">Qty: 4</option>
                <option value="5">Qty: 5</option>
            </select>
        </div>
        <div class="price"> Rs. ${el.Price}
        </div>`;

    let quantitySelect = description.querySelector("#quantity");
    quantitySelect.value = el.quantity;
    quantitySelect.addEventListener("change", () => {
      el.quantity = quantitySelect.value;
      localStorage.setItem("cart", JSON.stringify(data));
      topi.innerHTML = `Rs. ${total(data)}`;
    });

    div.append(imgDiv, description);

    let undo = document.createElement("button");
    undo.setAttribute("class", "undo");
    undo.textContent = "X";
    div.append(undo);

    dataDiv.append(div);

    undo.addEventListener("click", () => {
      let filtered = data.filter((ele, ind) => {
        if (el._id == ele._id) {
          return false;
        } else {
          return true;
        }
      });
      localStorage.setItem("cart", JSON.stringify(filtered));
      displayData(filtered);
      topi.innerHTML = `Rs. ${total(filtered)}`;
    });
  });
  document.getElementById("cartLeft").append(dataDiv);
};


displayData(data);

function total(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += Number(data[i].Price) * Number(data[i].quantity);
  }
  return sum;
}

const topi = document.getElementById("totalmrp");
topi.innerHTML = `Rs. ${total(data)}`;
