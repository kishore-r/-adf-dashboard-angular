import { Row } from './row';
import { IdAware } from './id-aware';
import {Widget} from './widget';

export interface Column extends IdAware {
  class?: string;
  rows?: Row[];
    // widgets
  widgets?: Widget[];
}

