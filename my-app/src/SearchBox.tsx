import "./SearchBox.css";
import {services} from "./services.js";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { isEmptyBindingElement } from "typescript";

async function fetchAllWords() {
  await services.getAllWords();
}

async function fetchOneWord({input}: {input: string;}) {
  await services.getOneWord(input);
}

function SearchWord({input}: {input: string;}){
  const [currentWordData, setWordData] = useState({});
  const inputs: string[] = input.split(" ");

  useEffect(() => {

    switch(inputs[0]) {
      case "dictionary": setWordData(fetchAllWords())
        break;
      default: setWordData(fetchOneWord({input}))
      
        break;
    }
  }, [input])

  return currentWordData;
}

function AllWords({result}: {result: {}}) {
  let htmlString = "";
  
  htmlString+= Header()
  for(let i=0; i<3;i++){
    htmlString += OneWordInDictionary({result})
  }
  
  return (htmlString)
}

function Header(){
  return(
    <table>
      <tr>
        <th className="table-header" aria-label="Searched Word Header"> Word: </th>
        <th className="table-header" aria-label="Word Meaning Header"> Meaning: </th>
        <th className="table-header" aria-label="Disability Context Header"> Context: </th>
        <th className="table-header" aria-label="Word Stigma Header"> Word Stigma: </th>
        <th className="table-header" aria-label="Word Substitutions Header"> Word Substitutions: </th>
      </tr>
    </table>
  )
  
}

function OneWordInDictionary({result}: {result: {}}) {
  //result will be a nested dictionary (its a word, which maps to a dictionary of the fields)
  //change result fields from strings to actual field
  console.log(result)
  return (
    <table>
      <tr>
        <td className="table-column" aria-label="Searched Word">{JSON.stringify(result)}</td>
        <td className="table-column" aria-label="Word Meaning">{"result.meaning"}</td>
        <td className="table-column" aria-label="Disability Context">{"result.context"}</td>
        <td className="table-column" aria-label="Word Stigma">{"result.stigma"}</td>
        <td className="table-column" aria-label="Word Substitutions">{"result.substitutions"}</td>
      </tr>
    </table>
  );
}

function OneWord({result}: {result: {}}, {input}: {input: string}) {
  //result will be a nested dictionary (its a word, which maps to a dictionary of the fields)
  //change result fields from strings to actual field
  console.log(result)
  if(result == null || result == "{}"){
    return WordNotFound({input})
  }
  else {
    return (
      <table>
        <tr>
          <th className="table-header" aria-label="Searched Word Header"> Word: </th>
          <th className="table-header" aria-label="Word Meaning Header"> Meaning: </th>
          <th className="table-header" aria-label="Disability Context Header"> Context: </th>
          <th className="table-header" aria-label="Word Stigma Header"> Word Stigma: </th>
          <th className="table-header" aria-label="Word Substitutions Header"> Word Substitutions: </th>
        </tr>
        <tr>
          <td className="table-column" aria-label="Searched Word">{JSON.stringify(result)}</td>
          <td className="table-column" aria-label="Word Meaning">{"result.meaning"}</td>
          <td className="table-column" aria-label="Disability Context">{"result.context"}</td>
          <td className="table-column" aria-label="Word Stigma">{"result.stigma"}</td>
          <td className="table-column" aria-label="Word Substitutions">{"result.substitutions"}</td>
        </tr>
      </table>
    );
  }
}

function WordNotFound({input}: {input: string;}){
  return(
    <div>
      <br></br>
      Your search <b>{input}</b> does not match any entries in our dictionary.
      <br></br>
    </div>
  )
}

function WordLog({input}: {input: string;}) {
  const result: {} = SearchWord({input});
  switch(input) {
    case "":
      return WordNotFound({input});
    case "dictionary":
      return AllWords({result});
      break;
    default:
      return OneWord({result}, {input});
      break;
  }
}

/* props for parsing the command box input */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Controlled input parses what is inputted into the command box
 */
function ControlledInput({ value, setValue, ariaLabel }: ControlledInputProps) {
  return (
      <input
          placeholder="Enter Word Here"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          aria-label={ariaLabel}
      />
  );
}

/* props for handling the user input */
interface CommandLineProps {
  addInput: (input: string) => any;
}

function SearchBar({addInput}: CommandLineProps) {
  const [value, setValue] = useState<string>("");

  return (
      <div className="search-bar" aria-label="Search Bar">
        <div className ="search-box" aria-label="Enter Word Here">
        <fieldset>
          <ControlledInput value={value} setValue={setValue} ariaLabel={"Search Box"}/>
        </fieldset>
        </div>
        <br></br>
        <div>
          <button
              className="search-button"
              aria-label="Submit Button"
              onClick={() => {
                addInput(value);
                console.log(`input: ${value}`);
              }}
          >
            search
          </button>
        </div>
      </div>
  );
}


export default function SearchBox() {
  const [inputs, setInputs] = useState<string[]>([]);

  return (
      <div className="App" aria-label="App">
        <SearchBar
            addInput={(input: string) => {
              const newInputs = inputs.slice();
              newInputs.push(input);
              setInputs(newInputs);
            }}
        />
        <div className={"history-log"} aria-label={"Word Search History"}>
          {inputs.map((input, index) => (
              <WordLog
                  input={input}
                  key={index}
              />
          ))}
        </div>
      </div>
  );
  }
  