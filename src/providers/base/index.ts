import type { BaseSendEmailOptions } from '../../base/types/send';
import {HttpStatus, HttpStatusText} from "../../utils/types";

export enum ProviderType {
  SENDGRID = 'sendgrid',
  SES = 'ses',
  POSTMARK = 'postmark',
  RESEND = 'resend',
}

export abstract class BaseProvider {
  key?: string;
  credentials?: Record<string, string>;
  type: ProviderType;

  constructor(key: string, type: ProviderType) {
    this.key = key;
    this.type = type;
  }

  async send(options: BaseSendEmailOptions): Promise<unknown> {
    return options;
  }
}

export class ProviderError extends Error {
  readonly name: string;
  readonly error: string;

  constructor(message: string, statusCode: HttpStatus) {
    super();
    this.message = message;
    this.name = statusCode.toString();
    this.error = HttpStatusText[statusCode];
  }

  static factory(response: Record<string, any>) {
    const error = response;
    return new ProviderError(error.message, error.statusCode);
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