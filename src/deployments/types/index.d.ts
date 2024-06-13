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

export type DeploymentArtifacts = {
  text: string;
  html: null;
  description: string;
  public_id: string;
  created_at: string;
  updated_at: string;
};

export type DeploymentListResponse = OrctaneListResponse<Deployment[]>;
export type DeploymentArtifactsListResponse = OrctaneListResponse<
  DeploymentArtifacts[]
>;
export type DeploymentResponse = OrctaneSuccessResponse<Deployment>;
