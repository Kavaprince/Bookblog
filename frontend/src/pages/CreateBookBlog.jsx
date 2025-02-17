//Step 10 - Create Book Blog Post
import { useState } from "react";
import { createBook } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateBookBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("datecreated", new Date());
    if (image) {
      formData.append("image", image);
    }
    try {
      await createBook(formData);
    } catch (error) {
      console.error("Error creating book:", error);
      alert("There was an error creating the book. Please try again.");
    }
  }

  return (
    //<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg w-1/3 my-5 hover:cursor-pointer"
    >
      <Label className="flex left-0 p-2">Book Title: </Label>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        name="title"
      />
      <Label className="flex left-0 p-2">Book Description: </Label>
      <Input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={500}
        required
        name="description"
      />
      <Label className="flex left-0 p-2">Book Content: </Label>
      <Textarea
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        required
        name="content"
      />
      <Label className="flex left-0 p-2">Insert Book Image: </Label>
      <Input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        name="image"
        className="cursor-pointer hover:bg-accent"
      />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
    //</div>
  );
}
