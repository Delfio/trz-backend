import express from 'express';
import AppError from '../usecase/MainErros';

export default
(err: Error, _: express.Request,
  response: express.Response, __: express.NextFunction): express.Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
