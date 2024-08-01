import { RequestHelper } from "../utils/helpers/request";
import type { SendEmailOptions } from "./types/send";
import { Template } from "../template";

export class Orctane {
  request: RequestHelper;
  template: Template;

  constructor(public readonly key?: string) {
    this.request = new RequestHelper(key);
    this.template = new Template(key);
  }

  send(options: SendEmailOptions) {
    return this.request.post("/email/send", options);
  }
}

// const orctane = new Orctane('orc_1234556');

// const provider = new ResendProvider('re_12345')

// orctane.send({
//   template_id: 'tm_3453f',
//   project_id: 'po_5nsfso4sFe',
//   to: ['recipient@example.com'],
//   from: 'sender@example.com',
//   subject: 'Test Email with Attachment',
//   text: 'This is a test email with attachment.',
//   html: '<p>This is a test email with attachment.</p>',
//   bcc: ['bcc@example.com'],
//   cc: ['cc@example.com'],
//   reply_to: ['replyto@example.com'],
//   provider: provider
// })
