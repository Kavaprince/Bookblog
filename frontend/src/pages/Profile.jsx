//step 20
import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { getBooks } from "../api";
import * as jwt_decode from "jwt-decode";
import { Label } from "@/components/ui/label";
//";

export function Profile() {
  //step 20
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwt_decode.jwtDecode(token);
      const allBooks = await getBooks();
      const filteredBooks = allBooks.filter(
        (book) => book.author == decodedUser._id
      );
      setBooks(filteredBooks);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);
  return (
    <div className=" w-1/3">
      <Label className="flex left-0 p-2 scroll-m-20 text-xl font-semibold tracking-tight">
        Name:
      </Label>
      <h2 className="flex left-0 mb-4">{user.name}</h2>
      <Label className="flex left-0 p-2 scroll-m-20 text-xl font-semibold tracking-tight">
        Email:
      </Label>
      <h2 className="flex left-0 mb-4">{user.email}</h2>
      <Label className="flex left-0 p-2 scroll-m-20 text-xl font-semibold tracking-tight">
        Join Date:
      </Label>
      <h2 className="flex left-0 mb-4">{user.joinDate}</h2>
      {books.map((book) => {
        return <BookCard book={book} />;
      })}
    </div>
  );
}
