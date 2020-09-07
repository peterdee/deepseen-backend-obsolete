import { sign } from 'jsonwebtoken';

import { TOKEN_SECRET } from '../configuration';

/**
 * Create a new token
 * @param {number|string} id - User ID 
 * @param {string} provider - token provider
 * @returns {Promise<string>} 
 */
export const createToken = async (
  id: number | string,
  provider: string,
): Promise<string> => sign(
  {
    id,
    provider,
  },
  TOKEN_SECRET,
);
