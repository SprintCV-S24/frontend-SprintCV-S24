import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TextFormProps {}

const TextForm: React.FC<TextFormProps> = () => {
  // State to store the entered text
  const [inputText, setInputText] = useState<string>('');
  // State to store the saved text
  const [savedText, setSavedText] = useState<string>('');

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
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input field for typing text */}
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type here..."
        />

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>

      {/* Display the saved text */}
      {savedText && (
        <div>
          <p>Saved Text:</p>
          <p>{savedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextForm;
