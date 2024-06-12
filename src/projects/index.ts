import type { Orctane } from '../orctane';
import { Pages } from '../pages';
import { Deployments } from '../deployments';
import type { ProjectListResponse, ProjectResponse } from './types';

export class Projects {
  constructor(
    private readonly orctane: Orctane,
    private projectId?: string,
  ) {}

  readonly pages = new Pages(this.orctane, this.projectId);
  readonly deployments = new Deployments(this.orctane, this.projectId);

  static factory(orctane: Orctane) {
    return (id?: string) => new Projects(orctane, id);
  }

  async list(): Promise<ProjectListResponse> {
    return await this.orctane.get<ProjectListResponse>('/projects');
  }

  async get(): Promise<ProjectResponse> {
    const path = `/projects/${this.projectId}`;
    return await this.orctane.get<ProjectResponse>(path);
  }
}
