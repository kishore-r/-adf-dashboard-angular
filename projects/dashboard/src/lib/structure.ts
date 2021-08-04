import { Row } from './row';
import { IdAware } from './id-aware';

export interface Structure extends IdAware {
  rows: Row[];
}

