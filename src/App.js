import React, { useState, useEffect } from 'react';
import rock from './rockyou.txt'
import rock2 from './r2.txt'

function App() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [wordFound, setWordFound] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const fileName = "./rockyou.txt"; // Replace with your actual filename
const [disableButton, setDisableButton] = useState(false);
  const handleChange = (event) => {
    setUserInput(event.target.value.toLowerCase());
  };

  const checkWord = async () => {
    try {
    await  setDisableButton(true);
      const textLower = fileContent.toLowerCase(); // Convert file text to lowercase for case-insensitive search
      const found = textLower.includes(userInput);
        setWordFound(found);
      setResult(found ? `${userInput} word exists in rockyou.txt, recommended to not use as password` : `${userInput} word not found in the rockyou.txt file, still make sure password is strong`);
    setDisableButton(false);
    } catch (error) {
      console.error("Error reading file:", error);
      setResult("Error: Could not read the file.");
      setDisableButton(false);
    }
  };

 async function GetAndSetFile() {

 // Load the file first
 const response = await fetch(rock).then(async(response)=>{
// make the text usable
let text = await response.text();
setFileContent(text);

 response = await fetch(rock2).then(async(response)=>{
  // make the text usable
   text = await response.text();
  setFileContent(prevText => prevText + text);
  
 })
 
  }) 


  
}

  useEffect( () => {
    
GetAndSetFile();
     

    // Empty dependency array to prevent infinite loops
  }, []);

  return (
    <div class="flex justify-center items-center h-screen">
    <div class='bg-white m-8 p-8 md:p-16'>
      <div class='grid grid-cols-1'>
        <label for="userInput" class='font-bold tracking-wide text-xs md:text-md'>Enter a word:</label>
        <input class='bg-white shadow-md border-2 rounded-md border-black mt-4 p-1 md:p-1' type="text" id="userInput" value={userInput} onChange={handleChange} />
        <p className='text-xs mt-4 text-gray'><i>This website verifies user input against the contents of the "rock_you.txt" file to determine if the entered value is present within the dataset.</i></p>
        <button disabled={disableButton} onClick={checkWord} class='bg-button_color text-white tracking-wider w-10/12 text-xs md:w-1/3 md:text-md font-bold rounded-md shadow-md m-auto mt-8 p-2' type="button">
          CHECK
        </button>
        <div class='mt-4'>
          {wordFound === true ? (<p class='text-xs md:text-sm text-center text-red'>{result}</p>) : (<p class='text-xs md:text-sm text-center text-green'>{result}</p>)}
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default App;
