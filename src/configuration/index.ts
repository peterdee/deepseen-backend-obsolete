import * as dotenv from 'dotenv';
dotenv.config();

const { env: Environment } = process;

// Database connection string
export const DATABASE_CONNECTION_STRING = Environment.DATABASE_CONNECTION || '';

// Response codes
export const HTTP_CODES = {
  badRequest: 400,
  created: 201,
  forbidden: 403,
  internalServerError: 500,
  noContent: 204,
  ok: 200,
  unauthorized: 401,
};

// Application port
export const PORT = Number(Environment.PORT) || 2111;

// Response messages
export const RESPONSE_MESSAGES = {
  accessDenied: 'ACCESS_DENIED',
  missingData: 'MISSING_DATA',
  ok: 'OK',
};
