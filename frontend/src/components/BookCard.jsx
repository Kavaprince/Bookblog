//import link
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BookCard({ book }) {
  //step 8
  // console.log("Date Created:", book.datecreated);

  //coverting jSON date from mongodb to readable date as stringDate.
  //stringDate.slice() lets you choose which part of the date is shown in frontend
  let date = new Date(book.datecreated);
  let stringDate = date.toString();

  console.log("Image path:", book.image);
  console.log("Image URL:", `http://localhost:5050${book.image}`);
  return (
    //Link it to Readblog to be able to click and view a particular book details
    <Card className="flex flex-col w-full justify-center my-8 hover:bg-muted">
      <Link to={`/readbook/${book._id}`} className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="truncate scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-primary">
              {book.title}
            </h1>
          </CardTitle>
          <CardDescription>
            <h2 className="truncate">{book.description}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {book.path && <img src={book.path} alt={book.title} className="" />}
          <h3>{stringDate.slice(4, 15)}</h3>
        </CardContent>
      </Link>
    </Card>
  );
}
