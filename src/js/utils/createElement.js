export const createElement = (tag, classList, content = '') => {
  const element = document.createElement(tag);
  element.classList = classList;
  element.innerHTML = content;
  return element;
};

export default createElement;
