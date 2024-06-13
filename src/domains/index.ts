import type { Orctane } from '../orctane';
import type { OrctaneListQuery } from '../utils/types';
import type { DomainListResponse, DomainResponse } from './types';

export class Domains {
  constructor(private readonly orctane: Orctane) {}

  async list(query?: OrctaneListQuery): Promise<DomainListResponse> {
    return await this.orctane.get<DomainListResponse>('/domains', {
      params: query,
    });
  }

  async get(id: string): Promise<DomainResponse> {
    const path = `/domains/${id}`;
    return await this.orctane.get<DomainResponse>(path);
  }
}
