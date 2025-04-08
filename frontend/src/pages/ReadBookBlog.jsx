//step 9
//useNavigate to navigate through different pages easier
import { useNavigate, useParams } from "react-router-dom"; //useparams uses an id to display data corresponfing to a particular id
import { getBook } from "../api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ReadBookBlog() {
  const [book, setBook] = useState({});

  let params = useParams();
  //use navigate
  const navigate = useNavigate();
  let id = params.id;

  useEffect(() => {
    async function loadBook() {
      let data = await getBook(id);
      let date = new Date(data.datecreated);
      data.datecreated = date.toString(); //converting JSON date from Mongodb to readable format AS sTRING
      setBook(data);
    }
    loadBook();
  }, []);
  // <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"> {book.author} </h2>
  //used navigate to create back button
  return (
    <div className="flex flex-col w-1/3 items-center">
      <Button onClick={() => navigate(-1)} className="w-48 my-4">
        Back
      </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        {book.title}
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">
        {book.description}
      </h2>
      <div className="flex w-full justify-center">
        {book.path && (
          <img src={book.path} alt={book.title} className="max-h-96 my-4" />
        )}
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {book.datecreated?.slice(4, 15)}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        {book.content}
      </p>
      <Button onClick={() => navigate(-1)} className="w-48 my-4">
        Back
      </Button>
    </div>
  );
}
