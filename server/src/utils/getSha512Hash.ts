import * as crypto from 'crypto';

/**
 * Make SHA512 hash with salt
 * @param text {string} - original text to make hash
 * @param salt {string} - salt to make hash
 */
const getSha512Hash = (text: string, salt: string) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(text);
  return hash.digest('hex');
};

export default getSha512Hash;
