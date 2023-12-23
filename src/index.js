import * as Cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
const baseUrl = 'https://www.lalitmauritius.org/en/dictionary.html';

const scrapeDataForLetter = async (letter) => {
  const url = `${baseUrl}?letter=${letter}`;
  let wordList = [];
  try {
    const response = await axios.get(url);
    const html = response.data;
    const parsed = Cheerio.load(html);
    const elements = parsed('#dictionarylist li').toArray();

    for (const el in elements) {
      let main = parsed(elements[el]).find('.main').text();
      let variations = parsed(elements[el]).find('.variations').text();
      let breakWord = main.match(/^(\S+)\s+(\(.+\))$/);
      let word = '';
      let type = '';
      if (breakWord) {
        word = breakWord[1];
        type = breakWord[2];
      }
      let meaning = parsed(elements[el]).find('.desc').text();
      meaning = meaning.replace(/<[^>]*>/g, '').replace(/<br\s*\/?>/g, '\n');
      wordList.push({
        word: word,
        type: type,
        variations: variations,
        meaning: meaning,
      });
    }

    return wordList;
  } catch (error) {
    throw new Error(`Error for letter ${letter}: ${error.message}`);
  }
};

const scrapData = async () => {
  // Create an array of alphabets
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const result = {};

  for (const letter of alphabets) {
    const data = await scrapeDataForLetter(letter);
    result[letter] = data;
  }

  // Convert the result to a JSON string
  const jsonData = JSON.stringify(result, null, 2);

  // Write the JSON data to a file in the dist folder
  const filePath = 'dist/data.json';
  fs.writeFileSync(filePath, jsonData);

  return result;
};

export { scrapData };
