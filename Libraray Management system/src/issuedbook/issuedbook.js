loadBooks();
loadUsers();
addIssuedBook();



const userdropdown = document.getElementById("userdropdown");
const booksdropdown = document.getElementById("booksdropdown");
const count = document.getElementById("count");
const issuedbookbtn = document.getElementById("issuedbookbtn");


function loadBooks() {
let loadedBooks = localStorage.getItem("localbooks");
if (loadedBooks == null) {
bookList = [];
} else {
bookList = JSON.parse(loadedBooks);
}
let bookHtml = "";
let bookdiv = document.getElementById("bookdiv");
bookList.forEach((book) => {
bookHtml += `<a class="dropdown-item" href="#" onclick="getBook()">${book.bookname}</a>`;
});
bookdiv.innerHTML = bookHtml;
}

function loadUsers() {
let loadedUsers = localStorage.getItem("localusers");
if (loadedUsers == null) {
userList = [];
} else {
userList = JSON.parse(loadedUsers);
}
let userHtml = "";
let userdiv = document.getElementById("userdiv");
userList.forEach((user) => {
userHtml += `<a class="dropdown-item" href="#" onclick="getUser()">${user.username}</a>`;
});
userdiv.innerHTML = userHtml;
}

function getUser() {
document.getElementById("userdropdown").innerHTML = event.target.innerHTML;
}

function getBook() {
document.getElementById("booksdropdown").innerHTML = event.target.innerHTML;
}

function addIssuedBook() {
let webLocalissuedBooks = localStorage.getItem("localissuedbooks");
if (webLocalissuedBooks == null) {
issuedBooks = [];
} else {
issuedBooks = JSON.parse(webLocalissuedBooks);
}
let issuedBookHtml = "";
let issuedBookList = document.getElementById("issuedbooklist");
var groupedUser=groupArrayOfObjects(issuedBooks,"username");

console.log(groupedUser);


      Object.keys(groupedUser).map(function(key,i){
        return  issuedBookHtml += `<tr>
        <th scope="row">${i+1}</th>
        <td>${key}</td>
        <td> <ul id="ul"> ${ Object.values(groupedUser[key]).map(function(s,i){
      
       return `<li>${s.book}_${s.count}</li>`
      
    
        })
      }
        </li>           
        
      
    

        </ul>
        </td>
        </tr>`;
      })
   
   


issuedBookList.innerHTML = issuedBookHtml;



}

issuedbookbtn.addEventListener("click", (e) => {
e.preventDefault();
//local storage
issuedBookObj = {
username: userdropdown.innerHTML,
book: booksdropdown.innerHTML,
count: count.value,
};
let webLocalissuedBooks = localStorage.getItem("localissuedbooks");
if (webLocalissuedBooks == null) {
issuedBooks = [];
} else {
issuedBooks = JSON.parse(webLocalissuedBooks);
}
issuedBooks.push(issuedBookObj);

//let table = document.getElementById("userlist");
//let html = "";
localStorage.setItem("localissuedbooks", JSON.stringify(issuedBooks));

console.log(issuedBooks);

addIssuedBook();
});


function groupArrayOfObjects(list, key) {
  return list.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


// var groupedUser=groupArrayOfObjects(issuedBooks,"username");
// var groupBooks=groupArrayOfObjects(issuedBooks,"book")
// console.log(groupedUser);
// console.log(groupBooks);


