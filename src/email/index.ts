import type { Orctane } from '../orctane';
import type { SendEmailOptions, SendEmailResponse } from './types';

export class Emails {
  constructor(private readonly orctane: Orctane) {}

  async send(payload: SendEmailOptions): Promise<SendEmailResponse> {
    return this.orctane.post<SendEmailResponse>('/emails', payload);
  }

  async get(id: string): Promise<unknown> {
    const path = `/emails/${id}`;
    return await this.orctane.get<unknown>(path);
  }
}
