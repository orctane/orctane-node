import type {
  OrctaneListResponse,
  OrctaneSuccessResponse,
} from '../../utils/types';

export enum DomainStatus {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  TEMPORARY_FAILURE = 'TEMPORARY_FAILURE',
}
export type Domain = {
  identity: string;
  dns_provider: string;
  open_tracking: boolean;
  verified_for_sending_status: boolean;
  verification_status: DomainStatus;
  public_id: string;
  created_at: string;
  updated_at: string;
};

export type DomainListResponse = OrctaneListResponse<Domain[]>;
export type DomainResponse = OrctaneSuccessResponse<Domain>;
