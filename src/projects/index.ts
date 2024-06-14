import type { Orctane } from '../orctane';
import { Pages } from '../pages';
import { Deployments } from '../deployments';
import type { ProjectListResponse, ProjectResponse } from './types';

export class Projects {
  readonly pages: Pages;
  readonly deployments: Deployments;

  constructor(
    protected orctane: Orctane,
    protected projectId?: string,
  ) {
    this.orctane = orctane;
    this.projectId = projectId;
    this.pages = new Pages(orctane, this.projectId);
    this.deployments = new Deployments(orctane, this.projectId);
  }

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
