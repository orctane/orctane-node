import type { HttpStatus } from '../../utils/types';

export type GetTemplateOptions = {
  project_id: string;
  template_id: string;
  version?: string;
  preview_text?: string;
  variables?: Record<string, unknown>;
};

export type TemplateResponse = {
  meta: {
    code: HttpStatus;
  };
  data: {
    id: string;
    html: string;
    text?: string;
    version: string;
  };
};
