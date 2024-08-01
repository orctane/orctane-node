import type { RequestHelper } from "../../../../../utils/helpers/request";

export type WaitCronCycleConditionalType = "gt" | "gte" | "eq";

export class WaitCronCycleConditionalThenable {
  constructor(
    protected readonly request: RequestHelper,
    protected readonly projectId: string,
    protected readonly cronId: string,
    protected readonly type: WaitCronCycleConditionalType,
    protected readonly cycleCount: number,
  ) {}

  thenCall(
    endpoint: string,
    options?: {
      headers?: Record<string, string>;
      params?: Record<string, unknown>;
      body: unknown;
    },
  ) {
    return this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/cancel/then`,
      {
        conditional: true,
        conditional_type: this.type,
        cycle_count: this.cycleCount,
        endpoint: {
          url: endpoint,
          options,
        },
      },
    );
  }
}

export class WaitCronCycleConditionals {
  constructor(
    protected readonly request: RequestHelper,
    protected readonly projectId: string,
    protected readonly cronId: string,
    protected readonly type: WaitCronCycleConditionalType,
    protected readonly cycleCount: number,
  ) {}

  async cancel() {
    return await this.request.post(
      `/workflow/${this.projectId}/wait/cron/${this.cronId}/cancel`,
      {
        conditional: true,
        conditional_type: this.type,
        cycle_count: this.cycleCount,
      },
    );
  }

  get cancelled() {
    return new WaitCronCycleConditionalThenable(
      this.request,
      this.projectId,
      this.cronId,
      this.type,
      this.cycleCount,
    );
  }
}
