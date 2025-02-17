//import { useState, useEffect } from "react";
import "./App.css";

//import routes from react-router-dom and import pages for step 6
//Router Component enables using URL to navigate through pages
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { CreateBookBlog } from "./pages/CreateBookBlog";
import { Homepage } from "./pages/Homepage";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { ReadBookBlog } from "./pages/ReadBookBlog";
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { useEffect } from "react";
import axios from "axios";

//import { useState, useEffect } from "react";
//for step5 after creating routes in api.js to test the routes
//import { getBooks, getBook, createBook, updateBook, deleteBook } from "./api";

//<Outlet />

//Step 3 - use axios to call backend and display (Install axios => npm install axios)
const App = () => {
  //step 6 - Define front end pages and create the pages folder in frontend and create the pages.jsx in the folder
  //install react router dom to build the routing scheme of the pages (npm i )
  //Pages

  //Landing page
  //Homepage
  //ReadBookBlog
  //CreateBookBlog
  //Profile
  //About
  //Contact
  //step 6 define the pages routes
  //step 6 test the fromt end routes to different pages by going to localhost: 5174;
  ////default page localhost:5174
  // About page localhost:5174/#/about
  // 'id'is added so because it is not a single page, you want to read
  // each user's blog post when clicked on it, so based on id, it will
  // render the book blog corresponding to the particular id

  //step6
  /* const [books, setBooks] = useState();

  useEffect(() => {
    async function loadAllBooks() {
      let data = await getBooks();

      if (data) {
        setBooks(data);
      }
    }
    loadAllBooks();
  }, []);*/
  //step 16
  useEffect(() => {
    let token = sessionStorage.getItem("User");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  return (
    //<>{JSON.stringify(books)}</>
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/createbook" element={<CreateBookBlog />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/readbook/:id" element={<ReadBookBlog />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};
export default App;

//step 5 - testing the routesto retrieve and manipulate data from front end to backend
/*const App = () => {
  //useState is used to render the frontend
  //const [data, setData] = useState();

  const [books, setBooks] = useState();
  //step 5 - implementing routes from api.js in front end app.jsx
  //create book
  function addBook() {
    let bookObject = {
      title: "Book5",
      description: "desc5",
      author: "auth5",
      year: 2022,
    };
    createBook(bookObject);
  }
    */
/*
  return (
    <>
      <button onClick={addBook}>Add Book</button>
    </>
  );
};*/
