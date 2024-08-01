import { Template } from '../template';
import { RequestHelper } from '../utils/helpers/request';
import { Workflow, type WorkflowOptions } from '../workflow';
import type { SendEmailOptions } from './types/send';

export class Orctane {
  request: RequestHelper;
  template: Template;

  constructor(public readonly key?: string) {
    this.request = new RequestHelper(key);
    this.template = new Template(key);
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

  workflow(options: WorkflowOptions) {
    return new Workflow(options, this.key as string);
  }
}
