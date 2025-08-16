export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ReasonPhrases = {
  [StatusCodes.OK]: 'OK',
  [StatusCodes.CREATED]: 'Created',
  [StatusCodes.NO_CONTENT]: 'No Content',
  [StatusCodes.BAD_REQUEST]: 'Bad Request',
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized',
  [StatusCodes.FORBIDDEN]: 'Forbidden',
  [StatusCodes.NOT_FOUND]: 'Not Found',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};
