import axios, { AxiosError } from 'axios';
import type { BaseSendEmailOptions } from '../../base/types/send';
import { BaseProvider, ProviderError } from '../base';
import { ProviderType } from '../base';
import { HttpStatus } from '../../utils/types';

export class PostmarkProvider implements BaseProvider {
  type: ProviderType = ProviderType.POSTMARK;

  constructor(public readonly key: string) {}

  async send(options: BaseSendEmailOptions) {
    const url = 'https://api.postmarkapp.com/email';
    const payload = {
      From: options.from,
      To: options.to[0],
      Cc: (options.cc ?? [])?.join(', '),
      Bcc: (options.bcc ?? [])?.join(', '),
      Subject: options.subject,
      Tag: options.tags,
      HtmlBody: options.html,
      TextBody: options.text,
      ReplyTo: options.reply_to,
      Headers: options.headers?.map((header) => ({
        Name: header.name,
        Value: header.value,
      })),
      TrackLinks: 'HtmlOnly',
      MessageStream: 'outbound',
    };

    try {
      await axios.post(url, payload, {
        headers: {
          'X-Postmark-Server-Token': this.key,
          'Content-Type': 'application/json',
        },
      });
    } catch (e: any) {
      if (e instanceof AxiosError) {
        throw ProviderError.factory(
          e.response?.data ?? {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong with postmark',
          }
        );
      }
      throw new ProviderError(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
