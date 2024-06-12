import type {
  OrctaneListResponse,
  OrctaneSuccessResponse,
} from '../../utils/types';

export type Deployment = {
  name: string;
  version: string;
  public_id: string;
  created_at: string;
  updated_at: string;
};

export type DeploymentListResponse = OrctaneListResponse<Deployment[]>;
export type DeploymentResponse = OrctaneSuccessResponse<Deployment>;
