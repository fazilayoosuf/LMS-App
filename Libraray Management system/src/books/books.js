addBooks();

let isbn = document.getElementById("isbn");
let book = document.getElementById("bookname");
let author = document.getElementById("author");
let publisher = document.getElementById("publisher");
let quantity = document.getElementById("quantity");
let addbookbtn = document.getElementById("addbookbtn");
let savebookbtn = document.getElementById("savebookbtn");

addbookbtn.addEventListener("click", (e) => {
e.preventDefault();
//local storage
if ((isbn.value.trim() && book.value.trim() && author.value.trim()&& 
publisher.value.trim()&& quantity.value.trim())!= 0) {
  bookObj = {
id: 0,
isbn: isbn.value,
bookname: book.value,
author: author.value,
publisher: publisher.value,
quantity: quantity.value,
issuedbooks: "",
};
let webtask = localStorage.getItem("localbooks");
if (webtask == null) {
books = [];
} else {
books = JSON.parse(webtask);
}
books.push(bookObj);
isbn.value="";
book.value="";
author.value="";
publisher.value="";
quantity.value="";
}
else{
  alert("enter all fields");

}
//let table = document.getElementById("booklist");
//let html = "";
localStorage.setItem("localbooks", JSON.stringify(books));
console.log(books);
addBooks();
});

function addBooks() {
let webtask = localStorage.getItem("localbooks");
if (webtask == null) {
books = [];
} else {
books = JSON.parse(webtask);
}
//get the table body
let bookHtml = "";
let booklist = document.getElementById("booklist");
books.forEach((book, index) => {
bookHtml += `<tr>
<th scope="row">${index + 1}</th>
<td>${book.isbn}</td>
<td>${book.bookname}</td>
<td>${book.author}</td>
<td>${book.publisher}</td>
<td>${book.quantity}</td>
<td>${book.issuedbooks}</td>
<td colspan="2">
<button type="button" class="btn btn-primary" onclick="editBookInfo(${index})">
Edit
</button>
<button type="button" id="myBtn" class="btn btn-danger" >
Delete
</button>
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Are you sure to delete this</p>
    <button onclick="deleteBookInfo(${index})">OK</button>
  </div>

</div>

</td>
</tr>`;
});
booklist.innerHTML = bookHtml;
}

//edit book details
function editBookInfo(index) {
    
saveindex.value = index;
let webtask = localStorage.getItem("localbooks");
let books = JSON.parse(webtask);

//id.value = array[index].key/propertyname
isbn.value = books[index].isbn;
book.value = books[index].bookname;
author.value = books[index].author;
publisher.value = books[index].publisher;
quantity.value = books[index].quantity;
addbookbtn.style.display = "none";
savebookbtn.style.display = "block";
}

//save book info

savebookbtn.addEventListener("click", (e) => {
e.preventDefault();
let webtask = localStorage.getItem("localbooks");
let books = JSON.parse(webtask);
let saveindex = document.getElementById("saveindex").value;
books[saveindex].isbn = isbn.value;
books[saveindex].bookname = book.value;
books[saveindex].author = author.value;
books[saveindex].publisher = publisher.value;
books[saveindex].quantity = quantity.value 
localStorage.setItem("localbooks", JSON.stringify(books));

addBooks();
});

function deleteBookInfo(index){

  let webtask = localStorage.getItem("localbooks");
let books = JSON.parse(webtask);
books.splice(index,1);
localStorage.setItem("localbooks", JSON.stringify(books));
isbn.value="";
book.value="";
author.value="";
publisher.value="";
quantity.value="";
addbookbtn.style.display = "block";
savebookbtn.style.display = "none";

addBooks();


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

