/**
 * author: fky
 * date: 2019-12-18
 */
import {Component, Input} from '@angular/core';
import {Row} from '../row';

@Component({
  selector: 'adf-dashboard-row',
  template: `
    <div *ngFor="let column of row.columns"
         [class]="'column '+ column.class"
         [style]="column.style">
      <!-- column template injected here -->
    </div>`
})
export  class AdfDashboardRowComponent {

  @Input()
  row: Row;
}
