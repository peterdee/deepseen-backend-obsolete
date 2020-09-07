import { HTTP_CODES, RESPONSE_MESSAGES } from '../configuration';
import { ResponseObject } from './types';

/**
 * Create and send a response
 * @param {*} Request - request object
 * @param {*} Response - response object
 * @param {number|string} status - response code
 * @param {string} message - response message
 * @param {*} data - any data to send
 * @returns {void}
 */
export default (
  Request,
  Response,
  status = HTTP_CODES.ok,
  message = RESPONSE_MESSAGES.ok,
  data = null,
) => {
  console.log(Request)
  const responseObject: ResponseObject = {
    datetime: Date.now(),
    message,
    request: `${Request.url} [${Request.raw.method}]`,
    status,
  };
  if (data) {
    responseObject.data = data;
  }

  return Response.code(status).send(responseObject);
};
