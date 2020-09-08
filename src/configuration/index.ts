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
  emailAddressIsAlreadyInUse: 'EMAIL_ADDRESS_IS_ALREADY_IN_USE',
  missingData: 'MISSING_DATA',
  missingToken: 'MISSING_TOKEN',
  ok: 'OK',
  oldPasswordIsInvalid: 'OLD_PASSWORD_IS_INVALID',
};

// Token providers
export const TOKEN_PROVIDERS = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web',
};

// Token secret
export const { TOKEN_SECRET = 'super-secret' } = Environment;
