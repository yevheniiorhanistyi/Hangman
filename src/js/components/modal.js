export const setupModal = (callback) => {
  const resetGame = callback;
  const showModal = (secretWord, isWin) => {
    const backdropEl = document.querySelector('.backdrop');
    const modalEl = backdropEl.querySelector('.modal');

    const messageEl = modalEl.querySelector('.modal-message');
    const secretWordEl = modalEl.querySelector('.modal-secret-word');
    const replayButton = modalEl.querySelector('.modal-replay-button');

    messageEl.textContent = `${isWin ? 'You won!' : 'You lost!'}`;
    messageEl.style = `color: ${isWin ? '#0c5703' : '#cb0000'}`;
    secretWordEl.textContent = `Secret word: ${secretWord}`;

    backdropEl.classList.add('visible');
    modalEl.classList.add('visible');

    replayButton.addEventListener('click', () => {
      backdropEl.classList.remove('visible');
      modalEl.classList.remove('visible');

      setTimeout(() => {
        resetGame();
      }, 200);
    });
  };

  return showModal;
};

export default setupModal;
