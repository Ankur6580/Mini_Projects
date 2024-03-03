const page = document.getElementById("page");
const input = document.getElementById("input");
const button = document.querySelector("button");
const list = document.getElementById("list");

button.addEventListener("click", function () {
  const text = input.value;
  const listItem = document.createElement("li");
  listItem.textContent = text;
  listItem.className = "list-item";

  // Create remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", function () {
    listItem.remove();
  });

  // Append remove button to list item
  listItem.appendChild(removeButton);

  // Append list item to the unordered list
  document.querySelector("ul").appendChild(listItem);

  list.style.display = "inline";

  // Clear the input field after adding the item
  input.value = "";
});
