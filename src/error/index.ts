import { HttpStatusText } from '../types';
import type { OrctaneErrorResponse } from '../types';
import type { HttpStatus } from '../types';

export class OrctaneError extends Error {
  readonly name: string;
  readonly error: string;

  constructor(message: string, statusCode: HttpStatus) {
    super();
    this.message = message;
    this.name = statusCode.toString();
    this.error = HttpStatusText[statusCode];
  }

  static factory(response: OrctaneErrorResponse) {
    const error = response;
    return new OrctaneError(error.message, error.statusCode);
  }

  override toString() {
    return JSON.stringify(
      {
        message: this.message,
        status_code: this.name,
        error: this.error,
      },
      null,
      2,
    );
  }
}
