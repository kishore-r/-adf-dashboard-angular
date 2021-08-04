import { Widget } from './widget';
import {Row} from './row';

export interface Model {
    // title of the dashboard
    title: string;
    // id of dashboard structure
    structure: string;

    rows: Row[];
}
