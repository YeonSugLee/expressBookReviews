const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user. Please add credentials."});      
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

//Get book list using async-await.
async function getAllBooks (){
    try {
        const resp = await axios({
          method: 'get',
          url: "https://tommylee62-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/",
          responseType: 'json'
        })
        console.log(resp);
      } 
      catch(e) {
        console.log(e);
      }
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });


// Get book by ISBN using async-await.
async function getBookByIsbn (isbn){
    try {
        const resp = await axios({
          method: 'get',
          url: "https://tommylee62-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/"+ isbn,
          responseType: 'json'
        })
        console.log(resp);
      } 
      catch(e) {
        console.log(e);
      }
}

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let bookList = []
    for (var i in books){
        if (books[i].author == author)
        bookList.push(books[i])
    }

    res.send(bookList)
});

// Get book by author using async-await.
async function getBookByIsbn (author){
    try {
        const resp = await axios({
          method: 'get',
          url: "https://tommylee62-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/"+ author,
          responseType: 'json'
        })
        console.log(resp);
      } 
      catch(e) {
        console.log(e);
      }
}

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let bookList = []
    for (var i in books){
        if (books[i].title == title)
        bookList.push(books[i])
    }

    res.send(bookList)
});

// get book by title using async-await.
async function getBookByIsbn (title){
    try {
        const resp = await axios({
          method: 'get',
          url: "https://tommylee62-5000.theiadocker-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/"+ title,
          responseType: 'json'
        })
        console.log(resp);
      } 
      catch(e) {
        console.log(e);
      }
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews)
});

module.exports.general = public_users;
