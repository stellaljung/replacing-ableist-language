import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './SearchBox';
import { services } from "./services.js";

function App() {
  document.title = 'Replacing Ableist Language'

  return (
    <div className="App" >
      <header className="App" aria-label="Website Information">
        <h1 className="App-header" aria-label="Website Title">Replacing Ableist Language</h1>
        <div className="App-description" aria-label="Website Description">Welcome to our dictionary for disability justice! Type “dictionary” into the command box to see all the words, their meanings and substitutions in our dictionary. Type any word into the command box to see its meaning, context in the field of disability studies, how it contributes to disability stigma, and some of our substitutions. Contact stella_ljung@brown.edu with any word submissions of your own!</div>
      </header>
      <SearchBox />
    </div>
  
  );
}

export default App;
