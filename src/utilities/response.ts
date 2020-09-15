import { HTTP_CODES, RESPONSE_MESSAGES } from '../configuration';
import { ResponseObject } from './types';

/**
 * Create and send a response
 * @param {*} Request - request object
 * @param {*} Response - response object
 * @param {number|string} status - response code
 * @param {string} message - response message
 * @param {*} data - any data to send
 * @param {boolean} middleware - if this response is sent from a middleware
 * @returns {void}
 */
export default (
  Request,
  Response,
  status = HTTP_CODES.ok,
  message = RESPONSE_MESSAGES.ok,
  data = null,
  middleware = false,
) => {
  const responseObject: ResponseObject = {
    datetime: Date.now(),
    message,
    request: `${(middleware && Request.originalUrl) || Request.url} [${Request.method}]`,
    status,
  };
  if (data) {
    responseObject.data = data;
  }

  if (middleware) {
    Response.setHeader('Content-Type', 'application/json');
    Response.statusCode = status;
    return Response.end(JSON.stringify(responseObject));
  }

  return Response.code(status).send(responseObject);
};
