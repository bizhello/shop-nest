const maxLengthWord = 30;

const maxAgeRefreshToken = 30 * 24 * 60 * 1000;

const allowedCors = [
  'https://bizhello.github.io',
  'https://bizhello.github.io/shop-family',
  'https://bizhello.github.io/shop-family/sign-in',
  'https://bizhello.github.io/shop-family/sign-up',
  'http://localhost:3000',
  'https://localhost:3000',
];

export { allowedCors, maxAgeRefreshToken, maxLengthWord };
