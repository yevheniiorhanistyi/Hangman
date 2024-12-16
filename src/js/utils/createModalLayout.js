import { createElement } from './createElement';

export const createModalLayout = () => {
  const backdropEl = createElement('div', 'backdrop');
  const modalEl = createElement('div', 'modal');
  const contentEl = createElement('div', 'modal-content');
  const messageEl = createElement('h3', 'modal-message', 'You lost!');
  const secretWordEl = createElement(
    'h4',
    'modal-secret-word',
    'Secret word: banana',
  );
  const replayButton = createElement('button', 'modal-replay-button');
  const btnImgEl = createElement('img', 'modal-replay-button-img');
  btnImgEl.src = './refresh.svg';
  btnImgEl.alt = 'Replay';
  replayButton.append(btnImgEl);

  contentEl.append(messageEl, secretWordEl, replayButton);
  modalEl.append(contentEl);
  backdropEl.append(modalEl);
  return backdropEl;
};

export default createModalLayout;
