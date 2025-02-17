import { getBooks } from "../api";
import { useState, useEffect } from "react";
import { BookCard } from "../components/BookCard";
//step 8 - Homepage
export function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //use useEffect to grab the data from mongodb and store in frontend
    async function loadAllBooks() {
      const data = await getBooks();
      //method sorting books from recent to old date
      data.sort(
        (d1, d2) =>
          new Date(d2.datecreated).getTime() -
          new Date(d1.datecreated).getTime()
      );
      setBooks(data);
    }
    loadAllBooks();
  }, []);

  //to display the info from database on frontend
  //map is like a for loop that goes through all the data
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-1/3 mt-4">
        {books.map((book) => {
          return <BookCard key={book._id} book={book} />;
        })}
      </div>
    </div>
  );
}
