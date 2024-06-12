import type { Orctane } from '../orctane';
import type { SendPageOptions, SendPageResponse } from './types';
import { isEmpty } from '../utils/is-empty';

export class Pages {
  constructor(
    private readonly orctane: Orctane,
    private projectId?: string,
  ) {
    if (isEmpty(projectId)) {
      throw new Error('Project ID is required to use Pages');
    }
  }

  async send(payload: SendPageOptions): Promise<SendPageResponse> {
    const path = `/frames/send/${this.projectId}`;
    return this.orctane.post<SendPageResponse>(path, payload);
  }
}
