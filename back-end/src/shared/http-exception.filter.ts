import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import * as _ from 'lodash';

@Catch(HttpException)
export class HttpErorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionError: any = exception.getResponse();
    const validationErrors: Array<ValidationError> = exceptionError.message;
    const newValidationErrors: Array<any> = [];

    console.log('status', status);

    console.log('err', exceptionError);

    if (
      exceptionError.message[0] instanceof ValidationError &&
      _.isArray(exceptionError.message)
    ) {
      for (const validationError of validationErrors) {
        for (const [key, value] of Object.entries(
          validationError.constraints,
        )) {
          const newObjectError = {
            message: `\"error.fields.${key}"\ ${value}`,
            property: validationError.property,
            payload: {
              value: validationError.value,
            },
          };
          newValidationErrors.push(newObjectError);
        }
      }
    }

    const messageErr = _.isArray(exceptionError.message)
      ? newValidationErrors
      : exceptionError.message;

    switch (status) {
      case 400:
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          // message: messageErr,
          message: exceptionError.message,
        });
        break;

      default:
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message: exceptionError.message,
        });
        break;
    }
  }

  // private _validationFilter(validationErrors: ValidationError[]) {
  //   console.log('here', validationErrors);

  // }
}
