import { createElement } from './createElement';
import { createModalLayout } from './createModalLayout';
import { bodyParts } from '../assets/bodyParts';

const isAppMounted = () => {
  const appEl = document.querySelector('.app');
  return appEl !== null;
};
export const createGameLayout = (secretWord, currentQuestion) => {
  if (isAppMounted()) document.querySelector('.app').remove();

  const appEl = createElement('div', 'app');
  const containerEl = createElement('div', 'container');
  const hangmanBoxEl = createElement('div', 'hangman-box');
  const gameBoxEl = createElement('div', 'game-box');
  const titleEl = createElement('h1', 'title', 'Hangman Game');
  const wrapperEl = createElement('div', 'wrapper');
  const wordEl = createElement('ul', 'word');
  const hintEl = createElement(
    'h3',
    'hint-text',
    `Hint: <b>${currentQuestion}</b>`,
  );
  const guessesEl = createElement(
    'h3',
    'guesses-text',
    `Incorrect guesses: <b>0 / 6</b>`,
  );

  wordEl.setAttribute('id', 'word');
  const letterArray = [...new Array(secretWord.length)];

  letterArray.forEach(() => {
    const letterEl = createElement('li', 'letter', '_');
    wordEl.append(letterEl);
  });

  const keyboardEl = createElement('div', 'keyboard');

  bodyParts.forEach((part) => {
    const imgEl = createElement('img', part.className);
    imgEl.src = part.src;
    imgEl.alt = part.alt;
    wrapperEl.append(imgEl);
  });

  const modalEl = createModalLayout();

  hangmanBoxEl.append(titleEl, wrapperEl);
  gameBoxEl.append(wordEl, hintEl, guessesEl, keyboardEl);
  containerEl.append(hangmanBoxEl, gameBoxEl);
  appEl.append(containerEl, modalEl);
  document.body.append(appEl);
};

export default createGameLayout;
