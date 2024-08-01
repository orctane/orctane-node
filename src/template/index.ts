import {RequestHelper} from "../utils/helpers/request";
import type {SendEmailOptions} from "../base/types/send";
import type {ListQuery} from "../utils/types";

export class Template {
    request: RequestHelper;
    
    constructor(public readonly key?: string) {
        this.request = new RequestHelper(key);
    }

    /**
     * Get a template by ID and applies the variables to the template
     * @param options
     */
    get(options: SendEmailOptions) {
        return this.request.post(`/template/${options.project_id}/${options.template_id}`, options);
    }

    /**
     * Get the raw template by ID
     * @param options
     */
    getRaw(options: SendEmailOptions) {
        return this.request.post(`/template/${options.project_id}/${options.template_id}`, options);
    }

    /**
     * Get all templates by project ID
     * @param projectId
     * @param options
     */
    getAllRaw(projectId: string, options: ListQuery = {}) {
        return this.request.get(`/template/${projectId}`, {
            params: {
                per_page: options.limit,
                page: options.take,
            }
        });
    }
}