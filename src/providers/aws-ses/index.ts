import {
  SESv2Client,
  SendEmailCommand,
  type SendEmailCommandInput,
} from '@aws-sdk/client-sesv2';
import {
  type SendMailOptions as NodeMailerSendOptions,
  type SentMessageInfo,
  type Transporter,
  createTransport,
} from 'nodemailer';
import type { BaseSendEmailOptions } from '../../base/types/send';
import type { BaseProvider } from '../base';
import { ProviderType } from '../base';

type SESProviderOptions = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export class SESProvider implements BaseProvider {
  type: ProviderType = ProviderType.SES;
  readonly credentials: Record<string, string>;
  protected readonly client: SESv2Client;
  protected readonly transporter: Transporter<SentMessageInfo>;

  constructor(public readonly options: SESProviderOptions) {
    const credentials = {
      secretAccessKey: options.secretAccessKey,
      accessKeyId: options.accessKeyId,
      region: options.region,
    };
    this.client = new SESv2Client({
      region: options.region,
      credentials,
    });

    this.transporter = createTransport({
      streamTransport: true,
      buffer: true,
    });

    this.credentials = credentials;
  }

  async send(options: BaseSendEmailOptions) {
    const config: NodeMailerSendOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      bcc: options.bcc,
      cc: options.cc,
      replyTo: options.reply_to,
      headers: options.headers?.map((header) => ({
        key: header.name,
        value: header.value,
      })),
      attachments: options.attachments?.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    };
    const { message: mimeMessage } = await this.transporter.sendMail(config);

    // Convert to Uint8Array
    const raw = new TextEncoder().encode(mimeMessage.toString());
    const input: SendEmailCommandInput = {
      Content: {
        Raw: {
          Data: raw,
        },
      },
      Destination: {
        ToAddresses: options.to,
        BccAddresses: options.bcc,
        CcAddresses: options.cc,
      },
      ReplyToAddresses: options.reply_to,
      FromEmailAddress: options.from,
      EmailTags: options.tags?.map((tag) => ({
        Name: tag.name,
        Value: tag.value,
      })),
    };

    const command = new SendEmailCommand(input);
    return await this.client.send(command);
  }
}
