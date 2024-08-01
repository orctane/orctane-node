import type { RequestHelper } from '../../../utils/helpers/request';
import { CronCycleConditionals } from './conditionals';

export class CronCycle {
  constructor(
    protected readonly request: RequestHelper,
    protected readonly projectId: string,
    protected readonly cronId: string,
  ) {}

  async skipNext() {
    return await this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/skip`,
      {
        cycle_count: 1,
      },
    );
  }

  async skip(cycleCount: number) {
    return await this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/skip`,
      {
        cycle_count: cycleCount,
      },
    );
  }

  eq(cycleCount: number) {
    return new CronCycleConditionals(
      this.request,
      this.projectId,
      this.cronId,
      'eq',
      cycleCount,
    );
  }

  gte(cycleCount: number) {
    return new CronCycleConditionals(
      this.request,
      this.projectId,
      this.cronId,
      'gte',
      cycleCount,
    );
  }

  gt(cycleCount: number) {
    return new CronCycleConditionals(
      this.request,
      this.projectId,
      this.cronId,
      'eq',
      cycleCount,
    );
  }
}
