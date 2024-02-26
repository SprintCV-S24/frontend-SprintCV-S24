import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface TextFormProps {}

const TextForm: React.FC<TextFormProps> = () => {
  // State to store the entered text
  const [inputText, setInputText] = useState<string>("");
  // State to store the saved text
  const [savedText, setSavedText] = useState<string>("");

  // Handler function for input text change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // Handler function for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save the entered text
    setSavedText(inputText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Item</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Input placeholder="Item Title"></Input>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="security-level">Security Level</Label>
            <Select>
              <SelectTrigger
                id="item-level"
                className="line-clamp-1 w-[160px] truncate"
              >
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Education</SelectItem>
                <SelectItem value="2">Experience</SelectItem>
                <SelectItem value="3">Extracurricular</SelectItem>
                <SelectItem value="4">Projects</SelectItem>
                <SelectItem value="5">Technical Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="I need help with..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please include all information relevant to your issue."
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
    // <Card className="w-[500px] h-[250px]">
    //   <CardHeader>
    //     Enter Resume Item
    //   </CardHeader>
      
    //   <div>
    //     <form onSubmit={handleSubmit}>
    //       {/* Input field for typing text */}
    //       <input
    //         type="text"
    //         value={inputText}
    //         onChange={handleInputChange}
    //         placeholder="Type here..."
    //       />

    //       {/* Submit button */}
    //       <button type="submit">Submit</button>
    //     </form>

    //     {/* Display the saved text */}
    //     {savedText && (
    //       <div>
    //         <p>Saved Text:</p>
    //         <p>{savedText}</p>
    //       </div>
    //     )}
    //   </div>
    // </Card>
  );
};

export default TextForm;
