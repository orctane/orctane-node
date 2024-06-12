import type { Orctane } from '../orctane';
import { isEmpty } from '../utils/is-empty';
import type { OrctaneListQuery } from '../utils/types';
import type {DeploymentListResponse, DeploymentResponse} from './types';

export class Deployments {
  constructor(
    private readonly orctane: Orctane,
    private readonly projectId?: string,
  ) {
    if (isEmpty(projectId)) {
      throw new Error('Deployment ID is required');
    }
  }

  async latest(): Promise<DeploymentResponse> {
    return await this.orctane.get<DeploymentResponse>(
      `/deployments/${this.projectId}/latest`,
    );
  }

  async artifacts(version = 'latest'): Promise<unknown> {
    return await this.orctane.get<unknown>(
      `/deployments/${this.projectId}/artifacts/${version}`,
    );
  }

  async list(query?: OrctaneListQuery): Promise<DeploymentListResponse> {
    return await this.orctane.get<DeploymentListResponse>(
      `/deployments/${this.projectId}`,
      {
        params: query,
      },
    );
  }

  async get(version: string): Promise<DeploymentResponse> {
    const path = `/deployments/${this.projectId}/${version}`;
    return await this.orctane.get<DeploymentResponse>(path);
  }
}

