import 'the-new-css-reset/css/reset.css';
import '@fontsource/schoolbell';
import '../styles/style.scss';

import { wordList } from './assets/wordList';
import { createElement, createGameLayout, getRandomValue } from './utils';
import { setupKeyboard } from './components/keyboard';
import { setupModal } from './components/modal';

document.addEventListener('DOMContentLoaded', () => {
  const MAX_INCORRECT_GUESSES = 6;
  let currentQuestion = null;
  let secretWord = null;
  let incorrectGuesses = 0;
  let letterElements = [];
  let showModal = null;
  let removeKeyboardListeners = null;

  const revealLetter = (letter) => {
    const wordArray = secretWord.split('');

    letterElements.forEach((li, index) => {
      const letterElement = li;
      if (wordArray[index] === letter) {
        letterElement.textContent = letter;
      }
    });
  };

  const updateGallows = () => {
    const wrapper = document.querySelector('.wrapper');
    const currentPart = wrapper.children[incorrectGuesses];
    if (currentPart) currentPart.classList.add('show');
  };

  const updateGuesses = () => {
    const guesses = document.querySelector('.guesses-text b');
    guesses.textContent = `${incorrectGuesses} / ${MAX_INCORRECT_GUESSES}`;
  };

  const updateButton = (btn, isCorrect) => {
    const currentBtn = btn;
    currentBtn.disabled = true;
    const imgEl = createElement('img', 'keyboard-key-img');
    imgEl.src = isCorrect ? './success.svg' : './error.svg';
    imgEl.alt = isCorrect ? 'Success' : 'Error';
    currentBtn.append(imgEl);
  };

  const onLetterClick = (btn) => {
    const currentBtn = btn;
    const letter = currentBtn.textContent;

    currentBtn.disabled = true;
    const isCorrect = secretWord.includes(letter);

    const imgEl = createElement('img', 'keyboard-key-img');

    updateButton(btn, isCorrect);

    if (isCorrect) {
      revealLetter(btn.textContent);
    } else {
      incorrectGuesses += 1;
      updateGallows();
      updateGuesses();
    }

    if (incorrectGuesses === 6) {
      showModal(secretWord, false);
    }

    const letters = Array.from(document.querySelectorAll('.letter'))
      .map((li) => li.textContent)
      .join('');
    if (letters === secretWord) {
      showModal(secretWord, true);
    }

    currentBtn.append(imgEl);
  };

  const initializeGame = () => {
    const randomNumber = Math.floor(getRandomValue(0, wordList.length));
    const { word, hint } = wordList[randomNumber];
    secretWord = word;
    currentQuestion = hint;
    incorrectGuesses = 0;
    showModal = setupModal(initializeGame);
    if (removeKeyboardListeners) removeKeyboardListeners();
    createGameLayout(secretWord, currentQuestion);
    letterElements = Array.from(document.querySelectorAll('.letter'));
    removeKeyboardListeners = setupKeyboard(onLetterClick);
  };

  initializeGame();
});
