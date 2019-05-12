import * as crypto from 'crypto';

/**
 * Generate random string
 * @param length {number} - length of random string
 */
const getRandomString = (length: number) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

export default getRandomString;
