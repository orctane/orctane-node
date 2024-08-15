import axios, { AxiosError } from 'axios';
import type { BaseSendEmailOptions } from '../../base/types/send';
import { BaseProvider, ProviderError } from '../base';
import { ProviderType } from '../base';
import { HttpStatus } from '../../utils/types';

export class SendGridProvider implements BaseProvider {
  type: ProviderType = ProviderType.SENDGRID;

  constructor(public readonly key: string) {}

  async send(options: BaseSendEmailOptions) {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const to = options.to.map((email) => ({ email }));
    const bcc = options.bcc?.map((email) => ({ email }));
    const cc = options.cc?.map((email) => ({ email }));

    const payload = {
      personalizations: [{ to, bcc, cc }],
      from: { email: options.from },
      subject: options.subject,
      content: [
        { type: 'text/plain', value: options.text },
        { type: 'text/html', value: options.html || options.text },
      ],
      reply_to: options.reply_to ? { email: options.reply_to } : undefined,
      headers: options.headers?.reduce((acc, current) => {
        return Object.assign({}, acc, { [current.name]: current.value });
      }, {}),
    };

    try {
      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.key}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (e: any) {
      if (e instanceof AxiosError) {
        throw ProviderError.factory(
          e.response?.data ?? {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong with sendgrid',
          }
        );
      }
      throw new ProviderError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
