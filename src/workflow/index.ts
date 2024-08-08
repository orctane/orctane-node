import type { SendEmailOptions } from '../base/types/send';
import { RequestHelper } from '../utils/helpers/request';
import { omit, omitBy } from '../utils/omit';
import type { OrctaneSuccessResponse } from '../utils/types';
import { Cron, type CronOptions } from './cron';
import type { CreateWorkflowResponse, ScheduleResponse } from './types';
import { Wait } from './wait';

export class Workflow {
  private request: RequestHelper;

  workflowId?: string;

  constructor(protected readonly key: string) {
    this.request = new RequestHelper(key);
  }

  async create(projectId: string, description?: string) {
    const res = await this.request.post<
      OrctaneSuccessResponse<CreateWorkflowResponse>
    >(`/workflows/${projectId}`, {
      description,
    });
    this.workflowId = res.data.id;
    return this;
  }

  get wait() {
    if (!this.workflowId) {
      throw new Error('Workflow ID is not defined');
    }
    return new Wait(this.key, this.workflowId);
  }

  cron(options: CronOptions) {
    if (!this.workflowId) {
      throw new Error('Workflow ID is not defined');
    }
    return new Cron(options, this.key, this.workflowId);
  }

  async schedule(
    options: Omit<SendEmailOptions, 'project_id'>,
  ): Promise<string> {
    const providerType = options.provider.type;
    const providerSecret = omitBy(
      {
        key: options.provider.key,
        access_key_id: options.provider.credentials?.accessKeyId,
        secret_access_key: options.provider.credentials?.secretAccessKey,
        region: options.provider.credentials?.region,
      },
      (value) => value === undefined,
    );

    const body = {
      provider_type: providerType,
      provider_secret: providerSecret,
      ...omit(options, ['provider', 'template_id']),
    };

    const res = await this.request.post<
      OrctaneSuccessResponse<ScheduleResponse>
    >(`/workflows/${this.workflowId}/schedule/${options.template_id}`, body);

    return res.data.id;
  }

  async cancel() {
    if (!this.workflowId) {
      throw new Error('Workflow ID is not defined');
    }
    return await this.request.delete(`/workflows/${this.workflowId}/cancel`);
  }
}
