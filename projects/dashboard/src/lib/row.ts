import { Column } from './column';
import { IdAware } from './id-aware';

export interface Row extends IdAware {
  class?: string;
  height?: string;
  columns?: Column[];
}

