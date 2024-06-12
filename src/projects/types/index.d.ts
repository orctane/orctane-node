import type {
  OrctaneListResponse,
  OrctaneSuccessResponse,
} from '../../utils/types';

export type Project = {
  name: string;
  public_id: string;
  created_at: string;
  updated_at: string;
};

export type ProjectListResponse = OrctaneListResponse<Project[]>;
export type ProjectResponse = OrctaneSuccessResponse<Project>;
