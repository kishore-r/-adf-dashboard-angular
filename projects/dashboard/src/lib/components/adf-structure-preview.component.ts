/**
 * author: fky
 * date: 2019-12-18
 */

import {Component, Input} from '@angular/core';
import {Structure} from '../structure';
import {StructureService} from '../structure.service';
import {Row} from '../row';

@Component({
  selector: 'adf-structure-preview',
  template: `
    <div class="structure-preview " [ngClass]="{'selected': selected}">
      <h4>{{name}}</h4>
      <adf-dashboard-row class="row " *ngFor="let row of preview.rows"
                         [row]="row" [style.height]="getRowheight(row)"></adf-dashboard-row>
    </div>`
})
export  class AdfStructurePreviewComponent {

  private _preview: Structure ;

  @Input()
  name: string;

  @Input()
  selected: boolean;

  @Input()
  set preview(preview: Structure) {
    this.adjustRowHeight(preview);
    this._preview = preview;
  }

  get preview(): Structure {
    return this._preview;
  }

  getRowheight(row: Row) {
    if (row.height) {
      return row.height + '%';
    }
    return '100%';
  }

  private adjustRowHeight(container: any) {
    if (container.rows && container.rows.length > 0) {
      const height = 100 / container.rows.length;

      container.rows.forEach(row => {
        row.height = height;

        if (row.columns) {
          row.columns.forEach(column => {
            this.adjustRowHeight(column);
          });
        }
      });
    }
  }

}
