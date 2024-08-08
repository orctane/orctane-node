import { RequestHelper } from '../utils/helpers/request';
import type { ListQuery, ListResponse } from '../utils/types';
import type { GetTemplateOptions, TemplateResponse } from './types';

export class Template {
  request: RequestHelper;

  constructor(public readonly key: string) {
    this.request = new RequestHelper(key);
  }

  /**
   * Get a template by ID and applies the variables to the template
   * @param options
   */
  get(options: GetTemplateOptions): Promise<TemplateResponse> {
    return this.request.post<TemplateResponse>(
      `/templates/get/${options.project_id}/${options.template_id}`,
      options,
    );
  }

  /**
   * Get the raw template by ID
   * @param options
   */
  getRaw(options: GetTemplateOptions) {
    return this.request.post<TemplateResponse>(
      `/templates/raw/${options.project_id}/${options.template_id}`,
      options,
    );
  }

  /**
   * Get all templates by project ID
   * @param projectId
   * @param options
   */
  getAllRaw(projectId: string, options: ListQuery & { version?: string } = {}) {
    return this.request.get<ListResponse<TemplateResponse[]>>(
      `/templates/raw/list/${projectId}`,
      {
        params: {
          per_page: options.per_page,
          page: options.page,
          version: options.version ?? 'latest',
        },
      },
    );
  }
}
