import axios from 'axios';

const API_ROOT = 'https://us-central1-pathology-to-power.cloudfunctions.net'

export const services = {
  getAllWords,
  getOneWord
}

async function getAllWords() {
  try {
    const response = await axios.get(`${API_ROOT}/allWords`);
    const dictionary = response.data
    return dictionary.map((word) => ({
            word: word.word,
            meaning: word.meaning,
            context: word.context,
            stigma: word.stigma,
            substitutions: word.substitutions,
          }))
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

async function getOneWord(word) {
  try {
    const response = await axios.get(`${API_ROOT}/oneWord?word=` + word);
    const wordData = response.data
    return {
            word: wordData.word,
            meaning: wordData.meaning,
            context: wordData.context,
            stigma: wordData.stigma,
            substitutions: wordData.substitutions,
          }
  } catch (error) {
    console.log("error", error);
    return null;
  }
  
}
