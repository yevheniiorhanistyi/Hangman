export const getRandomValue = (min, max) => {
  return Math.random() * (max - min) + min;
};

export default getRandomValue;
