import type { CronExpression } from '../../utils/enums';
import { RequestHelper } from '../../utils/helpers/request';
import type { OrctaneSuccessResponse } from '../../utils/types';

export type CronResponse = {
  id: string;
  expression: string;
};

export type CronOptions = {
  limit?: number;
  end?: Date;
  expression: CronExpression | string;
};

export class Cron {
  protected readonly request: RequestHelper;
  protected cronId: string | undefined;

  constructor(
    protected readonly options: CronOptions,
    protected readonly key: string,
    protected readonly projectId: string,
  ) {
    this.request = new RequestHelper(key);
  }

  async schedule(scheduleId: string) {
    const response = await this.request.post<
      OrctaneSuccessResponse<CronResponse>
    >(`/workflow/${this.projectId}/wait/cron/${scheduleId}`, {
      expression: this.options.expression,
      limit: this.options.limit,
      end: this.options.end,
    });

    this.cronId = response.data.id;

    return this;
  }

  async cancel() {
    if (!this.cronId) {
      throw new Error('Cron ID is not defined');
    }
    return await this.request.delete(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/cancel`,
    );
  }
}
