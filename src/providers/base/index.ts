import type { BaseSendEmailOptions } from '../../base/types/send';

export enum ProviderType {
  SENDGRID = 'sendgrid',
  SES = 'ses',
  POSTMARK = 'postmark',
  RESEND = 'resend',
}

export abstract class BaseProvider {
  key?: string;
  options?: Record<string, string>;
  type: ProviderType;

  constructor(key: string, type: ProviderType) {
    this.key = key;
    this.type = type;
  }

  async send(options: BaseSendEmailOptions): Promise<unknown> {
    return options;
  }
}
