import axios from "axios";
import type { BaseSendEmailOptions } from "../../base/types/send";
import type { BaseProvider } from "../base";
import { ProviderType } from "../base";

export class PostmarkProvider implements BaseProvider {
  type: ProviderType = ProviderType.POSTMARK;

  constructor(public readonly key: string) {}

  async send(options: BaseSendEmailOptions) {
    const url = "https://api.postmarkapp.com/email";
    const payload = {
      From: options.from,
      To: options.to,
      Cc: (options.cc ?? [])?.join(", "),
      Bcc: (options.bcc ?? [])?.join(", "),
      Subject: options.subject,
      Tag: options.tags,
      HtmlBody: options.html,
      TextBody: options.text,
      ReplyTo: options.reply_to,
      Headers: options.headers?.map((header) => ({
        Name: header.name,
        Value: header.value,
      })),
      TrackLinks: "HtmlOnly",
      MessageStream: "outbound",
    };

    await axios.post(url, payload, {
      headers: {
        "X-Postmark-Server-Token": this.key,
        "Content-Type": "application/json",
      },
    });
  }
}
