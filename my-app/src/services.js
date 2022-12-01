import axios from 'axios';

const API_ROOT = 'https://us-central1-pathology-to-power.cloudfunctions.net'

export const services = {
  getAllWords,
  getOneWord
}

function getAllWords() {
  axios.get(`${API_ROOT}/allWords`)
    .then((dictionary) => {
      return dictionary.data.map((word) => ({
        word: word.word,
        meaning: word.meaning,
        context: word.context,
        stigma: word.stigma,
        substitutions: word.substitutions,
      }))
    }).catch((error) => {
      console.log("getAllWords ERROR: ", error);
      return error
    })
}

function getOneWord(word) {
  axios.get(`${API_ROOT}/oneWord?word=` + word)
    .then((word) => {
      const wordData = word.data
      return {
        word: wordData.word,
        meaning: wordData.meaning,
        context: wordData.context,
        stigma: wordData.stigma,
        substitutions: wordData.substitutions,
      }
    }).catch((error) => {
      console.log("getOneWord ERROR", error);
      return error
    })
}
