import { IdAware } from './id-aware';

export interface Widget extends IdAware {
  title: string;
  description: string;
  type: string;
  position: Position;
  config: any;
}

export interface Position {
  column: string;
  order: number;
}
