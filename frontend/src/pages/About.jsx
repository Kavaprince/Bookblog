//step 11

import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="flex flex-col w-1/3 items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        About Us
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        Welcome to My Book Blog Post, a space where book lovers unite! Our
        mission is to create a vibrant community for readers to explore, review,
        and discuss their favorite books. Whether you're into gripping
        thrillers, heartwarming romances, or thought-provoking non-fiction,
        you'll find a home here.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        We believe that every book has a story beyond its pages—one that lives
        on through conversations, insights, and shared experiences. Join us as
        we dive into the world of literature, share recommendations, and
        celebrate the joy of reading. Start sharing your favorite books by
        visiting{" "}
        <Link to="/createBook" className="hover:text-primary">
          Add Book Post
        </Link>
        .
      </p>
    </div>
  );
}
