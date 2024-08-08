import axios from 'axios';
import type { BaseSendEmailOptions } from '../../base/types/send';
import type { BaseProvider } from '../base';
import { ProviderType } from '../base';

export class ResendProvider implements BaseProvider {
  type: ProviderType = ProviderType.RESEND;

  constructor(public readonly key: string) {}

  async send(options: BaseSendEmailOptions) {
    const url = 'https://api.resend.com/emails';
    const payload = {
      to: options.to,
      from: options.from,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
      tags: options.tags,
      reply_to: options.reply_to,
      bcc: options.bcc,
      cc: options.cc,
      headers: options.headers?.reduce((acc, current) => {
        return Object.assign({}, acc, { [current.name]: current.value });
      }, {}),
    };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${this.key}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
