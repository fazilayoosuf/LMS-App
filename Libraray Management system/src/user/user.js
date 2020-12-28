addUsers();

let username = document.getElementById("username");
let email = document.getElementById("email");
let address = document.getElementById("address");
let city = document.getElementById("city");
let contactno = document.getElementById("contactno");
let adduserbtn = document.getElementById("adduserbtn");
let saveuserbtn = document.getElementById("saveuserbtn");
//error message

adduserbtn.addEventListener("click", (e) => {
  e.preventDefault();

  //validation
  checkRequired([username, email, address, city,contactno]);
  //local storage
  if (
    (username.value.trim() &&
      email.value.trim() &&
      address.value.trim() &&
      city.value.trim() &&
      contactno.value.trim()) != 0
  ) {
    userObj = {
      id: 0,
      username: username.value,
      email: email.value,
      address: address.value,
      city: city.value,
      contactno: contactno.value,
    };
    let webuser = localStorage.getItem("localusers");
    if (webuser == null) {
      users = [];
    } else {
      users = JSON.parse(webuser);
    }

    users.push(userObj);
    username.value = "";
    email.value = "";
    address.value = "";
    city.value = "";
    contactno.value = "";
  } else {
    alert("enter all fields");
  }

  //let table = document.getElementById("userlist");
  //let html = "";
  localStorage.setItem("localusers", JSON.stringify(users));

  console.log(users);
  addUsers();
});

function addUsers() {
  let webuser = localStorage.getItem("localusers");
  if (webuser == null) {
    users = [];
  } else {
    users = JSON.parse(webuser);
  }
  //get the table body
  let userHtml = "";
  let userlist = document.getElementById("userlist");
  users.forEach((user, index) => {
    userHtml += `<tr>
<th scope="row">${index + 1}</th>
<td>${user.username}</td>
<td>${user.email}</td>
<td>${user.address}</td>
<td>${user.city}</td>
<td>${user.contactno}</td>
<td colspan="2">
<button type="button" class="btn btn-primary" onclick="editUserInfo(${index})">
Edit
</button>
<button type="button" id="myBtn" class="btn btn-danger" data-toggle="modal" data-target="#myModal" >
Delete
</button>
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Are you sure to delete this</p>
    <button onclick="deleteUserInfo(${index})">OK</button>
  </div>

</div>


</td>
</tr>`;
  });

  userlist.innerHTML = userHtml;
}

//edit user details
function editUserInfo(index) {
  saveindex.value = index;
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);

  //id.value = array[index].key/propertyname
  username.value = users[index].username;
  email.value = users[index].email;
  address.value = users[index].address;
  city.value = users[index].city;
  contactno.value = users[index].contactno;
  adduserbtn.style.display = "none";
  saveuserbtn.style.display = "block";
}

//save user info

saveuserbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);
  let saveindex = document.getElementById("saveindex").value;
  users[saveindex].username = username.value;
  users[saveindex].email = email.value;
  users[saveindex].address = address.value;
  users[saveindex].city = city.value;
  users[saveindex].contactno = contactno.value;
  localStorage.setItem("localusers", JSON.stringify(users));

  addUsers();
});

function deleteUserInfo(index) {
  let webuser = localStorage.getItem("localusers");
  let users = JSON.parse(webuser);
  users.splice(index, 1);
  localStorage.setItem("localusers", JSON.stringify(users));
  username.value = "";
  email.value = "";
  address.value = "";
  city.value = "";
  contactno.value = "";
  addUsers();
}


function showError(input, message) {

  const formControl = input.parentElement;
  formControl.className = ' error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
//success outline
function showSuccess(input) {

  const formControl = input.parentElement;
  formControl.className = ' success';
}
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
      if (input.value.trim() == "") {
          showError(input, `${getFieldName(input)} is required`)
      } else {
          showSuccess(input);
      }
  });
}
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

