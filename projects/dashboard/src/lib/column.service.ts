/**
 * author: fky
 * date: 2019-12-25
 */

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  private idCounter = 0;

  id(): string {
    return 'c-' + new Date().getTime() + '-' + (this.idCounter++);
  }
}
