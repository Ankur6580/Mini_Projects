// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYweykI41sY5N9UlIdlTVh2m-iyc0KAho",
  authDomain: "shopping-list-ec9a3.firebaseapp.com",
  databaseURL:
    "https://shopping-list-ec9a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopping-list-ec9a3",
  storageBucket: "shopping-list-ec9a3.appspot.com",
  messagingSenderId: "899204169829",
  appId: "1:899204169829:web:eeea08d64659f1160f868c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

addButton.addEventListener("click", () => {
  let inputValue = inputField.value;
  if (inputValue != "") {
    push(shoppingListInDB, inputValue);
    clearInput();
  }
});

onValue(shoppingListInDB, function (snapshot) {
  if(snapshot.exists()){
    let itemArray = Object.entries(snapshot.val());
  
    clearShoppingList();
  
    for (let i = 0; i < itemArray.length; i++) {
      let curItem = itemArray[i];
      let curItemId = curItem[0];
      let curItemValue = curItem[1];
  
      appendItemToShoppingList(curItem);
    }
  }else{
    shoppingList.innerHTML = "<span style='color: grey;'>Add items for shopping !<br><br>Double tap an Item to remove.</span>";
  }
});

function clearInput() {
  inputField.value = "";
}
function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function appendItemToShoppingList(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let itemLocation = ref(database, `shoppingList/${itemId}`);

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", () => {
    remove(itemLocation);
  });

  shoppingList.append(newEl);
}

// function addClass(element, className) {
//   element.addClass(className);
// }


