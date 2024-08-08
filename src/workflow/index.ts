import type { SendEmailOptions } from '../base/types/send';
import { RequestHelper } from '../utils/helpers/request';
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

  async schedule(options: SendEmailOptions): Promise<string> {
    const res = await this.request.post<
      OrctaneSuccessResponse<ScheduleResponse>
    >(`/workflows/schedule/${this.workflowId}`, {
      options,
    });
    return res.data.id;
  }

  cancel() {
    if (!this.workflowId) {
      throw new Error('Workflow ID is not defined');
    }
    return this.request.delete(`/workflows/${this.workflowId}/cancel`);
  }
}
