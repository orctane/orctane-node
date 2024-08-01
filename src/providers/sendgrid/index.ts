import axios from "axios";
import type { BaseSendEmailOptions } from "../../base/types/send";
import type { BaseProvider } from "../base";
import { ProviderType } from "../base";

export class SendGridProvider implements BaseProvider {
  type: ProviderType = ProviderType.SENDGRID;

  constructor(public readonly key: string) {}

  async send(options: BaseSendEmailOptions) {
    const url = "https://api.sendgrid.com/v3/mail/send";
    const to = options.to.map((email) => ({ email }));
    const bcc = options.bcc?.map((email) => ({ email }));
    const cc = options.cc?.map((email) => ({ email }));

    const payload = {
      personalizations: [{ to, bcc, cc }],
      from: { email: options.from },
      subject: options.subject,
      content: [
        { type: "text/plain", value: options.text },
        { type: "text/html", value: options.html || options.text },
      ],
      reply_to: options.reply_to ? { email: options.reply_to } : undefined,
      headers: options.headers?.reduce((acc, current) => {
        return Object.assign({}, acc, { [current.name]: current.value });
      }, {}),
    };

    await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
      },
    });
  }
}
