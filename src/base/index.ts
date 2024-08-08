import { Template } from '../template';
import { Workflow } from '../workflow';
import type { SendEmailOptions } from './types/send';

export class Orctane {
  template: Template;
  workflow: Workflow;

  constructor(public readonly key: string) {
    if (!key) {
      if (typeof process !== 'undefined' && process.env.ORCTANE_API_KEY) {
        this.key = process.env.ORCTANE_API_KEY as string;
      }

      if (!this.key) {
        throw new Error(
          'Missing API key. Pass it to the constructor `new Orctane("orc_ABC123")` or set the ORCTANE_API_KEY environment variable.',
        );
      }
    }

    this.template = new Template(key);
    this.workflow = new Workflow(key);
  }

  async send(options: SendEmailOptions) {
    const { data: template } = await this.template.get({
      project_id: options.project_id,
      template_id: options.template_id,
      version: options.version,
      variables: options.variables,
      preview_text: options.preview_text,
    });
    const sendOptions: SendEmailOptions = {
      ...options,
      html: template.html,
      text: template.text,
    };

    return await options.provider.send(sendOptions);
  }
}
