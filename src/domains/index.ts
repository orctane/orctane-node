import type { Orctane } from '../orctane';

export class Domains {
  constructor(private readonly orctane: Orctane) {}

  async list(): Promise<unknown> {
    return await this.orctane.get<unknown>('/domains');
  }

  async get(id: string): Promise<unknown> {
    const path = `/domains/${id}`;
    return await this.orctane.get<unknown>(path);
  }
}
