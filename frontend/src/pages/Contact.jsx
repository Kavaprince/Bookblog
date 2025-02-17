import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
//step 11
export function Contact() {
  function handleSubmit() {
    //Call API function
  }
  return (
    <div className="flex flex-col w-1/3 items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        Contact Us
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        We’d love to hear from you! Whether you have book recommendations,
        feedback, or just want to chat about your favorite reads, feel free to
        reach out.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-left">
        You can contact us via email{" "}
        <a href="" className="hover:text-primary">
          contact@gmail.com
        </a>{" "}
        or connect with us on social media. Let’s keep the book discussions
        going!
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full my-5 hover:cursor-pointer"
      >
        <Label className="flex left-0 p-2">Name:</Label>
        <Input type="text" name="name" />
        <Label className="flex left-0 p-2">Email:</Label>
        <Input type="email" name="email" />
        <Label className="flex left-0 p-2">Message:</Label>
        <Textarea name="message" id=""></Textarea>
        <Button className="mt-4" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
