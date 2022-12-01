import "./SearchBox.css";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

export const TEXT_submit_button_accessible_name = "submit button";
export const TEXT_command_box = "input box";
export const TEXT_submit_button_text = "submit";
export const TEXT_command_history_text = "command history";
export const TEXT_command_input = "command input";
export const TEXT_command_output = "command output";
export const TEXT_app = "app";
export const TEXT_command_handler = "command handler";

function SearchWord({input}: {input: string;}){
  const [currentWordData, setWordData] = useState({});
  const inputs: string[] = input.split(" ");

  useEffect(() => {

    switch(inputs[0]) {
      case "dictionary": setWordData(getAllWords())// setWordData(await getAllWords());
        break;
      default: setWordData(getOneWord({input}))// setWordData(await getOneWord({input}));
        break;
    }
  }, [input])


  return currentWordData;
}

async function getAllWords() {
  console.log("get all words 1")
  // const [currentWordData, setWordData] = useState({});

  console.log("get all words 2")
  await fetch("https://us-central1-pathology-to-power.cloudfunctions.net/allWords", { mode: 'no-cors'})
    .then((response) => response.json())
    .then((data) => {
      console.log("DATA: ", data)
    })
    // .then((r) => {
    //   console.log("RESPONSE:", r);
    //   console.log("body:", r.body);
    //   console.log("body:", r.json);
    //   // setWordData(r)
    // })

  // return currentWordData;
}

async function getOneWord({input}: {input: string;}) {
  const [currentWordData, setWordData] = useState({});

  await fetch("https://us-central1-pathology-to-power.cloudfunctions.net/oneWord?word="+input, { mode: 'no-cors'})
  .then((r) => {
    console.log("RESPOND:", r);
    setWordData(r)
  })

  return currentWordData;
}

function AllWords() {
  return (
      <table>
        <tr>
          <th className="searched-word" aria-label="Searched Word"> Word: </th>
          <th className="meaning" aria-label="Word Meaning"> Meaning: </th>
          <th className="context" aria-label="Disability Context"> Context: </th>
          <th className="stigma" aria-label="Word Stigma"> Word Stigma: </th>
          <th className="substitutions" aria-label="Word Substitutions"> Word Substitutions: </th>
        </tr>
      </table>
  );
}

function oneWord({result}: {result: string}) {
  //result will be a nested dictionary (its a word, which maps to a dictionary of the fields)
  //change result fields from strings to actual field
  return (
      <table>
        <tr>
          <th className="table-header" aria-label="Searched Word"> Word: </th>
          <th className="table-header" aria-label="Word Meaning"> Meaning: </th>
          <th className="table-header" aria-label="Disability Context"> Context: </th>
          <th className="table-header" aria-label="Word Stigma"> Word Stigma: </th>
          <th className="table-header" aria-label="Word Substitutions"> Word Substitutions: </th>
        </tr>
        <tr>
          <td className="table-column">{"result.word"}</td>
          <td className="table-column">{"result.meaning"}</td>
          <td className="table-column">{"result.context"}</td>
          <td className="table-column">{"result.stigma"}</td>
          <td className="table-column">{"result.substitutions"}</td>
        </tr>
      </table>
  );
}

function WordLog({input}: {input: string;}) {
  const result: string = SearchWord({input});

  switch(input) {
    case "dictionary":
      return AllWords();
      break;
    default:
      return oneWord({result});
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
        <div className ="search-box" aria-label="Enter word in the search bar here">
        <fieldset>
         <legend>Enter word here:</legend>
          <ControlledInput value={value} setValue={setValue} ariaLabel={TEXT_command_box}/>
        </fieldset>
        </div>
        <br></br>
        <div>
          <button
              className="search-button"
              aria-label={TEXT_submit_button_accessible_name}
              onClick={() => {
                addInput(value);
                console.log(`input: ${value}`);
              }}
          >
            <b>Search</b>
          </button>
        </div>
      </div>
  );
}

  export default function SearchBox() {
    const [inputs, setInputs] = useState<string[]>([]);

    return (
        <div className="App" aria-label={TEXT_app}>
          <SearchBar
              addInput={(input: string) => {
                const newInputs = inputs.slice();
                newInputs.push(input);
                setInputs(newInputs);
              }}
          />
          <div className={"history-log"} aria-label={TEXT_command_history_text}>
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