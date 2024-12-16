import { englishKeys } from '../assets/englishKeys';
import { createElement, getRandomValue } from '../utils';

const generateKeyboard = () => {
  const keyboard = document.querySelector('.keyboard');
  const btnList = [];

  for (let i = 0; i < englishKeys.length; i += 1) {
    const row = createElement('div', 'keyboard-row');
    keyboard.append(row);

    for (let j = 0; j < englishKeys[i].length; j += 1) {
      const key = createElement('button', 'keyboard-key');
      key.id = englishKeys[i][j].id;
      key.textContent = englishKeys[i][j].key;
      key.setAttribute('data-shift', englishKeys[i][j].shiftKey);
      key.setAttribute('data-code', englishKeys[i][j].code);

      const randomRotate = getRandomValue(-5, 5);
      const randomX = getRandomValue(-2, 2);
      const randomY = getRandomValue(-2, 2);

      key.style.setProperty('--rotate', `${randomRotate}deg`);
      key.style.setProperty('--x-offset', `${randomX}px`);
      key.style.setProperty('--y-offset', `${randomY}px`);

      btnList.push(key);
      row.append(key);
    }
  }
  return btnList;
};

export const setupKeyboard = (onLetterClick) => {
  const btnList = generateKeyboard();

  const handleKeydown = (e) => {
    e.preventDefault();
    const { code } = e;

    btnList.forEach((btn) => {
      if (btn.dataset.code === code) onLetterClick(btn);
    });
  };

  const handleMousedown = (e) => {
    const button = e.target.closest('.keyboard-key');

    if (button) {
      const { code } = button.dataset;
      btnList.forEach((btn) => {
        if (btn.dataset.code === code) onLetterClick(btn);
      });
    }
  };

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('mousedown', handleMousedown);

  const removeKeyboardListeners = () => {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('mousedown', handleMousedown);
  };

  return removeKeyboardListeners;
};

export default setupKeyboard;
