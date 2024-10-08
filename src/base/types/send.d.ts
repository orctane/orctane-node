import type { BaseProvider } from "../../providers/base";
import type { OrctaneSuccessResponse } from "../../utils/types";

export class BaseSendEmailOptions {
  /** The e-mail address of the sender. All e-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>' */
  from: string;

  /** An e-mail address that will appear on the Sender: field */
  sender?: string;

  /** The e-mail address of the recipient. All e-mail addresses can be plain 'recipient@server.com' or formatted 'Recipient Name <recipient@server.com>' */
  to: string[];

  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
  cc?: string[];

  /** Comma separated list or an array of recipients e-mail addresses */
  reply_to?: string[];

  /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
  bcc?: string[];

  /** The subject of the e-mail */
  subject: string;

  /** The plaintext version of the message */
  text?: string | undefined;

  /** The HTML version of the message */
  html?: string | undefined;

  /** An array of attachment objects */
  attachments?: Attachment[];

  tags?: Tag[];

  headers?: Header[];
}

export class Header {
  name: string;

  value: string;
}

export class Attachment {
  /** Content of an attached file. */

  content?: string;
  /** Name of attached file. */

  filename?: string;
  /** Path where the attachment file is hosted */

  path?: string;
}

export class Tag {
  /**
   * The name of the email tag. It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no more than 256 characters.
   */

  name: string;
  /**
   * The value of the email tag. It can only contain ASCII letters (a–z, A–Z), numbers (0–9), underscores (_), or dashes (-). It can contain no more than 256 characters.
   */

  value: string;
}

export class SendEmailOptions extends BaseSendEmailOptions {
  project_id: string;
  template_id: string;
  provider: BaseProvider;
  version?: string;
  preview_text?: string;
  variables?: Record<string, unknown>;
}

export type SendEmailResponse = OrctaneSuccessResponse<{ public_id: string }>;
