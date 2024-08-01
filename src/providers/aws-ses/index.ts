import SESClientModule, { SESv2Client } from "@aws-sdk/client-sesv2";
import type { BaseSendEmailOptions } from "../../base/types/send";
import type { BaseProvider } from "../base";
import { ProviderType } from "../base";
import {
  createTransport,
  type Transporter,
  type SendMailOptions as NodeMailerSendOptions,
} from "nodemailer";
import type SESTransport from "nodemailer/lib/ses-transport";

type SESProviderOptions = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

export class SESProvider implements BaseProvider {
  type: ProviderType = ProviderType.SES;
  protected readonly client: SESv2Client;
  protected readonly transporter: Transporter<SESTransport.SentMessageInfo>;

  constructor(public readonly options: SESProviderOptions) {
    this.client = new SESv2Client({
      region: options.region,
      credentials: {
        secretAccessKey: options.secretAccessKey,
        accessKeyId: options.accessKeyId,
      },
    });

    this.transporter = createTransport({
      SES: { ses: this.client, aws: SESClientModule },
    });
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
    await this.transporter.sendMail(config);
  }
}
