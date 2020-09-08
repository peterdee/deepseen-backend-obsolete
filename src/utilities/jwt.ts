import { sign, verify } from 'jsonwebtoken';

import { TOKEN_SECRET } from '../configuration';
import { TokenPayload } from './types';

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

/**
 * Verify the provided token
 * @param {string} token - token string
 * @returns {Promise<string|*>} 
 */
export const verifyToken = async (
  token: string,
): Promise<TokenPayload | any> => verify(token, TOKEN_SECRET);
